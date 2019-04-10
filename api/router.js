let express = require('express')
let router = express.Router()

let actSubmissionRouter = require('./act-submissions/router')
let catRouter = require('./cats/router')
let screenerSubmissionsRouter = require('./screener-submissions/router')
let stripeRouter = require('./stripe/router')
let userRouter = require('./users/router')

// CORS
router.use((request, response, next)=>{
  response.header("Access-Control-Allow-Origin", "http://localhost:8080")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  response.header("Access-Control-Allow-Credentials", "true")
  next()
})

router.use('/act-submissions', actSubmissionRouter)
router.use('/cats', catRouter)
router.use('/screener-submissions', screenerSubmissionsRouter)
router.use('/stripe', stripeRouter)
router.use('/users', userRouter)

router.get('/', (request, response)=> {
  response.send({ok: true})
})

module.exports = router