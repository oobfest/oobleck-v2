let express = require('express')
let router = express.Router()

// CORS
router.use((request, response, next)=>{
  response.header("Access-Control-Allow-Origin", "http://localhost:8080")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  response.header("Access-Control-Allow-Credentials", "true")
  next()
})

let actSubmissionsRouter = require('./act-submissions/router')
router.use('/act-submissions', actSubmissionsRouter)

let actsRouter = require('./acts/router')
router.use('/acts', actsRouter)

let badgesRouter = require('./badges/router')
router.use('/badges', badgesRouter)

let catRouter = require('./cats/router')
router.use('/cats', catRouter)

let hostsRouter = require('./hosts/router')
router.use('/hosts', hostsRouter)

let screenerSubmissionsRouter = require('./screener-submissions/router')
router.use('/screener-submissions', screenerSubmissionsRouter)

let showsRouter = require('./shows/router')
router.use('/shows', showsRouter)

let stripeRouter = require('./stripe/router')
router.use('/stripe', stripeRouter)

let usersRouter = require('./users/router')
router.use('/users', usersRouter)

let workshopsRouter = require('./workshops/router')
router.use('/workshops', workshopsRouter)

router.get('/', (request, response)=> {
  response.send({ok: true})
})

module.exports = router