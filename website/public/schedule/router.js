let express = require('express')
let router = express.Router()
let showModel = require('../../../api/shows/model')

router.get('/', (request, response)=> {
  response.render('public/schedule', {alt: true})
})

router.get('/list', (request, response)=> {
  response.render('public/schedule/list', {alt: true})
})

router.get('/:day/:venue/:time', async (request, response)=> {
  let day = request.params.day
  let venue = request.params.venue
  let time = request.params.time
  let show = await showModel.find(day, venue, time)
  if (show == null) response.redirect('/')
  else {
    show.venue = formatVenue(show.venue)
    show.time = formatTime(show.startTime)
    response.render('public/schedule/show', {show: show, alt: true})
  }
})

let formatVenue = function(venue) {
  switch(venue) {
    case 'Hideout Up':        return 'The Hideout Theatre (Upstairs)'
    case 'Hideout Down':      return 'The Hideout Theatre (Downstairs)'
    case 'ColdTowne':         return 'ColdTowne Theater'
    case 'Fallout':           return 'The Fallout Theater'
    case 'Velveeta':          return 'The Velveeta Room'
    case 'North Door':        return 'The North Door'
    default:                  return venue
  }
}

let formatTime = function(time) {
  time = String(time)
  return time.slice(0, time.length-2) + ":" + time.slice(time.length-2) + "pm"
}

module.exports = router