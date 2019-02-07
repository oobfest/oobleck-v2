let express = require('express')
let router = express.Router()

let actSubmissionRouter = require('./act-submissions/router')
let catRouter = require('./cats/router')
let screenerSubmissionsRouter = require('./screener-submissions/router')
let stripeRouter = require('./stripe/router')
let userRouter = require('./users/router')

router.use('/act-submissions', actSubmissionRouter)
router.use('/cats', catRouter)
router.use('/screener-submissions', screenerSubmissionsRouter)
router.use('/stripe', stripeRouter)
router.use('/users', userRouter)

router.get('/', (request, response)=> {
  response.send({ok: true})
})

module.exports = router