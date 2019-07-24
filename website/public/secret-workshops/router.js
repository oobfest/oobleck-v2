let express = require('express')
let router = express.Router()
let format = require('../../../utilities/format')

let workshopsModel = require('../../../api/workshops/model')

router.get('/', async (request, response)=> {
  let workshops = await workshopsModel.read()

  let sortedWorkshops = ['Saturday', 'Sunday', 'Monday']
    .map(day=> workshops
      .filter(w=>w.day==day)
      .sort((a,b)=>a.time - b.time))

  // Flatten
  sortedWorkshops = sortedWorkshops.reduce((acc, val) => acc.concat(val), [])

  for (workshop of sortedWorkshops) {
    // Time
    if(workshop.time=="10") workshop.time = "11:00am"
    else if(workshop.time=="20") workshop.time = "12:00pm"
    else if(workshop.time=="30") workshop.time = "1:00pm"
    else if(workshop.time=="40") workshop.time = "3:00pm"

    // Venue
    workshop.venue = format.formatVenueShort(workshop.venue)

    // Day
    workshop.day = format.formatDay(workshop.day)
  }

  response.render('public/secret-workshops', {workshops: sortedWorkshops, alt: true})
})

module.exports = router