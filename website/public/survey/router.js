let express = require('express')
let router = express.Router()

router.get('/', (request, response)=> {
  response.render('public/survey')
})

module.exports = router
