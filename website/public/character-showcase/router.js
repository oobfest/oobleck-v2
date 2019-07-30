let express = require('express')
let router = express.Router()

router.get('/', (request, response)=> {
  response.render('public/character-showcase')
})

module.exports = router