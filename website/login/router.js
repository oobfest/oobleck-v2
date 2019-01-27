let express = require('express')
let router = express.Router()
let passport = require('passport')

router.get('/login', (request, response)=> {
  response.render('login')
})

router.post('/login', (request, response, next)=> {
  passport.authenticate('local', (authenticationError, user, info)=> {
    if(authenticationError) next(authenticationError)
    else if (!user) response.render('login', {info})
    else request.logIn(user, (loginError)=> {
      if (loginError) next(loginError)
      // If user was trying to get to a specific page, redirect to it
      else if (request.body['attempted-url']) response.redirect(request.body['attempted-url'])
      else response.send("YAY")
    })
  })(request, response, next)
})

router.get('/logout', (request, response)=> {
  request.logout()
  response.render('login', { info: { message: "You have been logged out!" } })
})

module.exports = router