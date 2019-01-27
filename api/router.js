let express = require('express')
let router = express.Router()

let catRouter = require('./cats/router')
let userRouter = require('./users/router')

router.use('/cats', catRouter)
router.use('/users', userRouter)

router.get('/', (request, response)=> {
  response.send({ok: true})
})

module.exports = router