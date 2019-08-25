let express = require('express')
let router = express.Router()
let userModel = require('../../api/users/model')
let submissionModel = require('../../api/act-submissions/model')
let showModel = require('../../api/shows/model')

router.get('/', (request, response)=> {
  response.render('public', {alt: true})
})

router.get('/set-password/:id/:key', async (request, response, next)=> {
  let key = request.params.key
  if(key != process.env.PASSWORD_KEY) {
    next(Error("Unauthorized"))
  }
  else {
    let id = request.params.id
    let user = await userModel.read(id)
    response.render('public/users/set-password', {...user, key})
  }
})

router.post('/set-password/', async (request, response)=> {
  let key = request.body.key
  if(key != process.env.PASSWORD_KEY) {
    next(Error("Unauthorized"))
  }
  else {
    let id = request.body.id
    let password = request.body.password
    try {
      let user = await userModel.setPassword(id, password)
      response.render('public/login', { info: { message: "Password set!" } })
    }
    catch(error) {
      next(error)
    }
  }
})

router.get('/apply', (request, response)=> {
  response.render('public/act-submission-form/closed')
})

router.get('/apply-secret/:secret', (request, response)=> {
  let secret = request.params.secret
  if (secret == process.env.LATE_SUBMISSION_SECRET) {
    response.render('public/act-submission-form')
  }
  else {
    response.render('public/act-submission-form/closed')
  }
})

let stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY)
router.post('/stripe', async (request, response)=> {
  try {
    let customerData = {
      email: request.body.stripeEmail,
      source: request.body.stripeToken
    }
    let customer = await stripe.customers.create(customerData)
    let chargeData = {
      amount: 500,
      description: "Wow, another test charge!",
      currency: 'usd',
      customer: customer.id
    }
    let charge = await stripe.charges.create(chargeData)
    response.render('payment-success')
  }
  catch(error) {
    next(error)
  }
})

router.use(require('./act-submission-confirmation/router'))
router.use(require('./act-submission-edit/router'))
router.use(require('./login/router'))
router.use('/apply-screener', require('./screener-submission-form/router'))
router.use('/character-showcase', require('./character-showcase/router'))
router.use('/demographic-survey', require('./demographic-survey/router'))
router.use('/get-badges', require('./get-badges/router'))
router.use('/host', require('./host/router'))
router.use('/lineup', require('./lineup/router'))
router.use('/schedule', require('./schedule/router'))
router.use('/tech-needs', require('./tech-needs/router'))
router.use('/tickets', require('./tickets/router'))
router.use('/travel-info', require('./travel-info/router'))
router.use('/volunteer', require('./volunteer/router'))
router.use('/workshops', require('./workshops/router'))

module.exports = router
