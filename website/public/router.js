let express = require('express')
let router = express.Router()
let userModel = require('../../api/users/model')

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