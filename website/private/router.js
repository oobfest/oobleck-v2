let express = require('express')
let router = express.Router()

// Don't router.use(isLoggedIn), it will catch for pages that don't exist
let isLoggedIn = require('is-logged-in')

router.get('/screener-submissions', isLoggedIn, (request, response)=> {
  response.render('screener-submissions')
})

router.get('/users', isLoggedIn, (request, response)=> {
  response.render('users')
})

router.get(['/submissions'], isLoggedIn, (request, response)=> {
  response.render('stub')
})

module.exports = router