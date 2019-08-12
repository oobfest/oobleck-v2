let express = require('express')
let router = express.Router()
let format = require('../../../utilities/format')
let urlSlug = require('url-slug')

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
    workshop = formatWorkshop(workshop)
  }

  response.render('public/workshops', {workshops: sortedWorkshops, alt: true})
})

router.get('/:slug', async (request, response)=> {
  let slug = request.params.slug
  let workshops = await workshopsModel.read()
  let workshop = workshops.find(w=> urlSlug(w.name) == slug)
  workshop = formatWorkshop(workshop)
  response.render('public/workshops/workshop', {workshop, alt:true})
})

let formatWorkshop = function(workshop) {

  // Remove Students
  workshop.students = null

  // Time
  if(workshop.time=="10") workshop.time = "11:00am to 2:00pm"
  else if(workshop.time=="20") workshop.time = "12:00pm to 3:00pm"
  else if(workshop.time=="30") workshop.time = "1:00pm to 4:00pm"
  else if(workshop.time=="40") workshop.time = "3:00pm to 6:00pm"

  // Venue
  workshop.venue = format.formatVenueShort(workshop.venue)

  // Day
  workshop.day = format.formatDay(workshop.day)

  // Slug
  workshop.slug = urlSlug(workshop.name)

  return workshop
}

module.exports = router