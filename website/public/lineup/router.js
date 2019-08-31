let express = require('express')
let router = express.Router()
let actModel = require('../../../api/acts/model')
let showModel = require('../../../api/shows/model')

router.get('/', (request, response)=> {
  response.render('public/lineup', {alt: true})
})

router.get('/:name', async(request, response)=> {
  let name = request.params.name
  let act = await actModel.find(name)
  if(act) {
    act.shows = []
    // Get Shows
    let shows = await showModel.read()
    for(show of shows) {
      for(showAct of show.acts) {
        if(showAct.name == act.name) {
          act.shows.push({
            day: show.day,
            venue: formatVenue(show.venue),
            time: formatTime(show.startTime),
            url: show.url
          })
        }
      }
    }    
    response.render('public/lineup/act', {alt: true, act})
  }
  else {
    response.redirect('/lineup')
  }

})

let formatVenue = function(venue) {
  switch(venue) {
    case 'Hideout Up':        return 'Hideout Theatre Upstairs'
    case 'Hideout Down':      return 'Hideout Theatre Downstairs'
    case 'ColdTowne':         return 'ColdTowne Theater'
    case 'Fallout':           return 'Fallout Theater'
    case 'Velveeta':          return 'Velveeta Room'
    default:                  return venue
  }
}

let formatTime = function(time) {
  time = String(time)
  return time.slice(0, time.length-2) + ":" + time.slice(time.length-2) + "pm"
}

module.exports = router