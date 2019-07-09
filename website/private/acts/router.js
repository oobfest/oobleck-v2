let express = require('express')
let router = express.Router()
let isLoggedIn = require('../is-logged-in')

router.get('/', isLoggedIn, (request, response, next)=> {
  response.render('private/acts')
})

router.get('/create', isLoggedIn, (request, response, next)=> {
  response.render('private/acts/create')
})

router.get('/social', isLoggedIn, (request, response, next)=> {
  response.render('private/acts/social')
})

module.exports = router
