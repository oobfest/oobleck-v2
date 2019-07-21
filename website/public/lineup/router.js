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
  response.render('public/lineup/act', {alt: true, act})
})

module.exports = router