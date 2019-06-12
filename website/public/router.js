let express = require('express')
let router = express.Router()
let userModel = require('../../api/users/model')
let submissionModel = require('../../api/act-submissions/model')
let showModel = require('../../api/shows/model')


router.get('/', (request, response)=> {
  response.render('public', {alt: true})
})

router.get('/accept/:submissionId', async (request, response, next)=> {
  let submissionId = request.params.submissionId
  let submission = await submissionModel.read(submissionId)
  if(submission.showType.includes('Standup')) response.render('public/act-submission-confirmation', {act: submission})
  else {
    let shows = await showModel.read()
    let dates = shows.filter(s=> s.acts.filter(a=> String(a._id) == String(submission._id)).length > 0)
    let days = ""
    if (dates.length > 0) {
      days = convertDay(dates[0].day)
      if(dates.length > 1) days += " and " + convertDay(dates[1].day)
    }
    response.render('public/act-submission-confirmation', {act: submission, days})
  }
})

function convertDay(day) {
  switch(day) {
    case "Monday": return "Monday, September 3rd"
    case "Tuesday": return "Tuesday, August 28th"
    case "Wednesday": return "Wednesday, August 29th"
    case "Thursday": return "Thursday, August 30th"
    case "Friday": return "Friday, August 31st"
    case "Saturday": return "Saturday, September 1st"
    case "Sunday": return "Sunday, September 2nd"
  }
}

router.post('/accept/:submissionId', async (request, response, next)=> {
  let submissionId = request.params.submissionId
  let confirmationStatus = request.body['confirmation-status']

  // set confirmation status of submission
  let submission = await submissionModel.read(submissionId)
  submission.confirmationStatus = confirmationStatus
  let savedSubmission = await submissionModel.update(submissionId, submission)

  // Then
  response.redirect(savedSubmission._id)
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

router.get('/edit-application/:submissionId', (request, response)=> {
  let submissionId = request.params.submissionId
  response.render('public/act-submission-edit', {submissionId})
})

router.get('/apply', (request, response)=> {
  response.render('public/act-submission-form/closed')
})

router.get('/host-submission-form/', (request, response)=> {
  response.render('public/host-submission-form')
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