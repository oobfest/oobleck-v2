let express = require('express')
let router = express.Router()

let stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
let actSubmissionModel = require('../act-submissions/model')
let badgeModel = require('../badges/model')
let showModel = require('../shows/model')

let nodemailer = require('../../utilities/nodemailer')
let badgeEmailTemplate = require('../../email-templates/compile')('badge')
let reservationConfirmationEmailTemplate = require('../../email-templates/compile')('reservation-confirmation')

let format = require('../../utilities/format')


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
      amount: getBadgePrice(badge.type) * badge.quantity,
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

let getBadgePrice = function(type) {
  if (type == 'all') return 9900
  if (type == 'performer-upgrade') return 6900
  if (type == 'performer-weekend-upgrade') return 4500
}

let sendBadgeEmail = function(badge) {
  let emailContent = badgeEmailTemplate(badge)
  nodemailer.sendEmail(badge.email, `Out of Bounds Comedy Festival - Badge Purchase Confirmation`, emailContent)
}

router.post('/show/:showId', async (request, response)=> {
    let showId = request.params.showId
    let ticket = request.body.ticket
    ticket.type = 'stripe'
    ticket.email = request.body.token.email
  try {
    let card = request.body.token.id
    let show = await showModel.read(showId)
    let customer = await stripe.customers.create({email: ticket.email, card})
    ticket.payment = await stripe.charges.create({
      amount: (show.price * ticket.quantity) * 100,
      currency: 'usd',
      description: ticket.quantity + "× " + show.day + " at " + format.formatVenueShort(show.venue) + ", " + format.formatTime(show.startTime),
      customer: customer.id
    })
    let ticketResponse = await showModel.addTicket(showId, ticket)
    sendTicketEmail(ticket, show)
    response.json({paid: true})
  }
  catch(error) {
    console.log(error)
    response.status(500).send({paid: false})
  }
})

let sendTicketEmail = function(ticket, show) {
  let recipient = ticket.email
  let subject = 'Booking Confirmation for Out of Bounds'
  let message = reservationConfirmationEmailTemplate({
    name: ticket.name,
    where: format.formatVenue(show.venue),
    when: show.day + ", " + format.formatTime(show.startTime),
    isBadge: false,
    quantity: ticket.quantity
  })
  nodemailer.sendEmail(recipient, subject, message)
}

module.exports = router