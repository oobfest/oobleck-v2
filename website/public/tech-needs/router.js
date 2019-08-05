let express = require('express')
let router = express.Router()

router.get('/', (request, response)=> {
  response.render('public/tech-needs')
})

module.exports = router