let express = require('express')
let router = express.Router()

router.get('/apply', (request, response)=> {
  response.render('act-submission-form')
})

router.get('/apply-screener', (request, response)=> {
  response.render('screener-submission-form')
})

// Login and Logout pages
let loginRouter = require('./login/router')
router.use(loginRouter)

module.exports = router