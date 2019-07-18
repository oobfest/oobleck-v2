let express = require('express')
let router = express.Router()

router.get('/', (request, response)=> {
  response.render('public/schedule', {alt: true})
})

router.get('/list', (request, response)=> {
  response.render('public/schedule/list', {alt: true})
})

module.exports = router