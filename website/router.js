let express = require('express')
let router = express.Router()

let publicRouter = require('./public/router')
let privateRouter = require('./private/router')

router.use(publicRouter)
router.use(privateRouter)

router.use((error, request, response, next)=> {
  response.status(500).render('error', {error})
})

module.exports = router