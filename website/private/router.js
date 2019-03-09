let express = require('express')
let userModel = require('../../api/users/model')
let submissionModel = require('../../api/act-submissions/model')
let router = express.Router()

// Don't router.use(isLoggedIn), it will catch for pages that don't exist
let isLoggedIn = require('./is-logged-in')
let isRole = require('./is-role')

router.get('/act-submissions', isLoggedIn, isRole(['admin', 'staff']), (request, response)=> {
  response.render('private/act-submissions')
})

router.get('/act-submission/:id', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions/act-submission')
})


router.get('/act-submissions/review/', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions/review-act-submissions')
})

router.get('/act-submissions/review/:id', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions/review-act-submission', {submissionId: request.params.id})
})

router.post('/act-submissions/review/:id', isLoggedIn, (request, response)=> {
  try {
    let submissionId = request.body.submissionId
    let review = {
      userId: request.body.userId,
      username: request.body.username,
      score: request.body.score,
      notes: request.body.notes
    }
    submissionModel.createReview(submissionId, review)
    response.redirect('/act-submissions/review')
  }
  catch(error) {
    next(error)
  }
})

router.get('/screener-submissions', isLoggedIn, (request, response)=> {
  response.render('private/screener-submissions')
})

router.get('/users', isLoggedIn, isRole(['admin', 'staff']), (request, response)=> {
  response.render('private/users', {key: process.env.PASSWORD_KEY})
})

router.get('/users/:id', isLoggedIn, async (request, response, next)=> {
  try {
    let account = await userModel.read(request.params.id)
    response.render('private/users/account', { account })
  }
  catch(error) {
    next(error)
  }
})

router.get(['/submissions'], isLoggedIn, (request, response)=> {
  response.render('private/stub')
})

module.exports = router