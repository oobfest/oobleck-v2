let express = require('express')
let router = express.Router()
let actModel = require('../../../api/acts/model')

router.get('/', (request, response)=> {
  response.render('public/lineup', {alt: true})
})

router.get('/:actName', async(request, response)=> {
  let actName = request.params.actName
  let act = await actModel.getByName(actName)
  response.render('public/lineup/act', {alt: true, act, shows: []})
})

module.exports = router