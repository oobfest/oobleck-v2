let express = require('express')
let userModel = require('../../../api/users/model')
let submissionModel = require('../../../api/act-submissions/model')
let router = express.Router()

// Don't router.use(isLoggedIn), it will catch for pages that don't exist
let isLoggedIn = require('../is-logged-in')
let isRole = require('../is-role')

router.get('/stamp', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions/stamp')
})

router.get('/', isLoggedIn, isRole(['admin', 'staff']), (request, response)=> {
  response.render('private/act-submissions')
})

router.get('/:id', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions/act-submission')
})

router.get('/reviews/:id', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions/act-submission-reviews', {submissionId: request.params.id})
})

router.get('/review/', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions/review-act-submissions')
})

router.get('/review/:id', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions/review-act-submission', {submissionId: request.params.id})
})

router.post('/review/:id', isLoggedIn, (request, response)=> {
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


module.exports = router