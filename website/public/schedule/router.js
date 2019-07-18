let express = require('express')
let router = express.Router()
let showModel = require('../../../api/shows/model')

router.get('/', (request, response)=> {
  response.render('public/schedule', {alt: true})
})

router.get('/list', (request, response)=> {
  response.render('public/schedule/list', {alt: true})
})

router.get('/:day/:venue/:time', (request, response)=> {
  let day = request.params.day
  let venue = request.params.venue
  let time = request.params.time
  //console.log(showModel.find(day, venue, time))
  response.send(`${day}, ${venue}, ${time}`)
})

module.exports = router