let express = require('express')
let router = express.Router()

let catRouter = require('./cats/router')
let userRouter = require('./users/router')
let screenerSubmissionsRouter = require('./screener-submissions/router')

router.use('/cats', catRouter)
router.use('/users', userRouter)
router.use('/screener-submissions', screenerSubmissionsRouter)

router.get('/', (request, response)=> {
  response.send({ok: true})
})

module.exports = router