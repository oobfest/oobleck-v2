let express = require('express')
let router = express.Router()

router.get('/:key', (request, response, next)=> {
  let actualKey = process.env.TICKETS_KEY
  let attemptedKey = request.params.key
  if (attemptedKey == actualKey) response.render('public/tickets', {key: attemptedKey})
  else next()
})

let model = require('../../../api/shows/model')
let formatter = require('../../../utilities/format')

router.post('/', async (request, response, next)=> {

  // Check key!
  let attemptedKey = request.body.key
  let actualKey = process.env.TICKETS_KEY
  if (attemptedKey != actualKey) next()

  // Key is valid
  let day = request.body.day
  let venue = request.body.venue
  let time = request.body.time
  let url = `${day}/${venue}/${time}`

  let show = await model.find(url)
  if(show == null) response.send(`Show "${day} ${venue} ${time}" not found`)
  else {
    let tickets = show.tickets.sort((a,b)=>
      a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0 )
    response.render('public/tickets/show', {
      day: formatter.formatDay(day),
      venue: formatter.formatVenueShortest(venue),
      time: formatter.formatTime(time),
      tickets,
      price: show.price,
      capacity: show.capacity,
      remaining: show.remaining,
    })
  }
})

module.exports = router
