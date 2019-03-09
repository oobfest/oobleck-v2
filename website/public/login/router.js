let express = require('express')
let router = express.Router()
let passport = require('passport')

router.get('/', (request, response)=> {
  response.redirect('/login')
})

router.get('/login', (request, response)=> {
  response.render('public/login')
})

router.post('/login', (request, response, next)=> {
  passport.authenticate('local', (authenticationError, user, info)=> {
    if(authenticationError) next(authenticationError)
    else if (!user) response.render('public/login', {info})
    else request.logIn(user, (loginError)=> {
      if (loginError) next(loginError)
      // If user was trying to get to a specific page, redirect to it
      else if (request.body['attempted-url']) response.redirect(request.body['attempted-url'])
      else {
        if(user.roles.includes('admin')) response.redirect('/users')
        else if (user.roles.includes('staff')) response.redirect('/act-submissions')
        else if (user.roles.includes('reviewer')) response.redirect('/act-submissions/review')
        else if (user.roles.includes('standup-reviewer')) response.redirect('/act-submissions/review')
        else next(Error("Role not found"))
      }
    })
  })(request, response, next)
})

router.get('/logout', (request, response)=> {
  request.logout()
  response.render('public/login', { info: { message: "You have been logged out!" } })
})

module.exports = router