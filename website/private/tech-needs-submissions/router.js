let express = require('express')
let router = express.Router()
let isLoggedIn = require('../is-logged-in')

router.get('/', isLoggedIn, (request, response, next)=> {
  response.render('private/tech-needs-submissions')
})

module.exports = router