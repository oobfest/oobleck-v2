let express = require('express')
let router = express.Router()
let actModel = require('../../../api/acts/model')

router.get('/', async(request, response)=> {
  response.render('public/lineup')
})

router.get('/:actName', async(request, response)=> {
  let actName = request.params.actName
  console.log(actName)
  let act = await actModel.getByName(actName)
  console.log(act)
  response.render('public/lineup/act', act)
})

module.exports = router