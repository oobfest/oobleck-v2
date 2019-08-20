let express = require('express')
let router = express.Router()
let isLoggedIn = require('../is-logged-in')
let showModel = require('../../../api/shows/model')

router.get('/', isLoggedIn, (request, response, next)=> {
  response.render('private/shows')
})

router.get('/:id', async (request, response, next)=> {
  let showId = request.params.id
  try {
    let show = await showModel.read(showId)
    response.render('private/shows/print-tickets', show)
  }
  catch(error) {
    next(error)
  }
})

module.exports = router
