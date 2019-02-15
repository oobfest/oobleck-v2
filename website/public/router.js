let express = require('express')
let router = express.Router()

router.get('/apply', (request, response)=> {
  response.render('public/act-submission-form')
})

router.get('/apply-screener', (request, response)=> {
  response.render('public/screener-submission-form')
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


// Login and Logout pages
let loginRouter = require('./login/router')
router.use(loginRouter)

module.exports = router