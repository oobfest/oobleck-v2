let express = require('express')
let router = express.Router()

let isLoggedIn = function (request, response, next) {
  if (request.isAuthenticated()) {
    response.locals.user = request.user
    next()
  }
  else {
    response.render('login', {
      info: { message: "You must be logged in to view " + request.originalUrl },
      attemptedUrl: request.originalUrl
    })    
  }
}

router.use(isLoggedIn)

router.get('/screener-submissions', (request, response)=> {
  response.render('screeners/submissions')
})

router.get('/users', (request, response)=> {
  response.render('users')
})

router.get(['/submissions'], (request, response)=> {
  response.render('stub')
})

// Error Handling
router.use((error, request, response, next)=> {
  response
    .status(error.status || 500)
    .render('error', {error})
})

module.exports = router