let express = require('express')
let router = express.Router()

router.get('/screener-submissions/apply', (request, response)=> {
  response.render('screeners/submissions/apply')
})

// Login and Logout pages
let loginRouter = require('./login/router')
router.use(loginRouter)

// Error Handling
router.use((error, request, response, next)=> {
  response
    .status(error.status || 500)
    .render('error', {error})
})

module.exports = router