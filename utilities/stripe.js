let stripe = require('stripe')(process.env.STRIPE_TEST_KEY)

let charge = {
  amount: 200,
  currency: 'usd',
  receipt_email: 'sld.potato@gmail.com',
  description: "I have no idea what I'm doing"
}
stripe.charges.create(charge, (error, response)=> {
  console.log(error, response)
})