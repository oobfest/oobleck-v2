let express = require('express')
let router = express.Router()

let catRouter = require('./cats/routes')
router.use('/cats', catRouter)

let userRouter = require('./users/routes')
router.use('/users', userRouter)

router.get('/', (request, response)=> {
  response.send({ok: true})
})

module.exports = router