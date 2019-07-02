let express = require('express')
let router = express.Router()

let stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
let actSubmissionModel = require('../act-submissions/model')
let badgeModel = require('../badges/model')

let nodemailer = require('../../utilities/nodemailer')
let badgeEmailTemplate = require('../../email-templates/compile')('badge')


router.post('/submission/:submissionId', async (request, response)=> {
  let submissionId = request.body.submissionId
  let submissionSize = request.body.submissionSize
  try {
    let customer = await stripe.customers.create({
      email: request.body.token.email,
      card: request.body.token.id
    })
    let payment = await stripe.charges.create({
      amount: submissionSize > 2 ? 5000 : 3500,
      currency: 'usd',
      customer: customer.id
    })
    let submission = await actSubmissionModel.addPayment(submissionId, payment)
    response.json(submission)
  }
  catch(error) {
    console.log(error)
    response.status(500).send({ok: false})
  }
})

router.post('/badges/', async (request, response)=> {
  let badge = request.body.badge
  badge.email = request.body.token.email
  try {
    let customer = await stripe.customers.create({
      email: request.body.token.email,
      card: request.body.token.id
    })
    badge.payment = await stripe.charges.create({
      amount: getPrice(badge.type) * badge.quantity,
      currency: 'usd',
      customer: customer.id
    })
    let badgeResponse = await badgeModel.create(badge)
    sendBadgeEmail(badge)
    response.json({paid: true})
  }
  catch(error) {
    console.log(error)
    response.status(500).send({ok: false})
  }
})

let getPrice = function(type) {
  if (type == 'all') return 9900
  if (type == 'performer-upgrade') return 6900
  if (type == 'performer-weekend-upgrade') return 4500
}

let sendBadgeEmail = function(badge) {
  let emailContent = badgeEmailTemplate(badge)
  nodemailer.sendEmail(badge.email, `Out of Bounds Comedy Festival - Badge Purchase Confirmation`, emailContent)
}

module.exports = router