let express = require('express')
let router = express.Router()

router.get('/', (request, response)=> {
  response.render('public/get-badges', {alt: true})
})

module.exports = router