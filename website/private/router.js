let express = require('express')
let userModel = require('../../api/users/model')
let router = express.Router()

// Don't router.use(isLoggedIn), it will catch for pages that don't exist
let isLoggedIn = require('./is-logged-in')

router.get('/act-submissions', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions')
})

router.get('/act-submission/:id', isLoggedIn, (request, response)=> {
  response.render('private/act-submissions/act-submission')
})

router.get('/screener-submissions', isLoggedIn, (request, response)=> {
  response.render('private/screener-submissions')
})

router.get('/users', isLoggedIn, (request, response)=> {
  response.render('private/users')
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