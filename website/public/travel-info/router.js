let express = require('express')
let router = express.Router()

router.get('/', (request, response)=> {
  response.render('public/travel-info')
})

module.exports = router