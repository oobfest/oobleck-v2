let express = require('express')
let router = express.Router()

let publicRouter = require('./public/router')
let privateRouter = require('./private/router')

router.use(publicRouter)
router.use(privateRouter)

module.exports = router