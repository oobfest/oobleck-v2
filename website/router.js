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

router.get('/', (request, response)=> {
  response.render('index')
})

router.get('/users', isLoggedIn, (request, response)=> {
  response.render('users')
})

let loginRouter = require('./login/router')
router.use(loginRouter)

// Error Handling
router.use((error, request, response, next)=> {
  response
    .status(error.status || 500)
    .render('error', {error})
})

module.exports = router