let express = require('express')
let router = express.Router()

//let catRouter = require('./cat/router')
//router.use('/cat', catRouter)

router.get('/', (request, response)=> {
  response.send({ok: true})
})


module.exports = router