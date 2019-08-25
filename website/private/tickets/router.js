let express = require('express')
let router = express.Router()
let isLoggedIn = require('../is-logged-in')

router.get('/', isLoggedIn, (request, response)=> {
  response.render('private/tickets')
})

module.exports = router
