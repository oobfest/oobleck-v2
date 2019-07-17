let express = require('express')
let router = express.Router()

router.get('/', (request, response)=> {
  response.render('public/schedule')
})

router.get('/list', (request, response)=> {
  response.render('public/schedule/list')
})

module.exports = router