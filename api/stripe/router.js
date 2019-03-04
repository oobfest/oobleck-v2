let express = require('express')
let router = express.Router()

let stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
let actSubmissionModel = require('../act-submissions/model')

router.post('/submission/:submissionId', async (request, response)=> {
  let submissionId = request.body.submissionId
  let submissionSize = request.body.submissionSize
  try {
    let customer = await stripe.customers.create({
      email: request.body.token.email,
      card: request.body.token.id
    })
    let payment = await stripe.charges.create({
      amount: submissionSize > 2 ? 4500 : 2500,
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

module.exports = router