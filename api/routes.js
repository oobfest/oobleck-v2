let express = require('express')
let router = express.Router()

let catRouter = require('./cats/routes')
router.use('/cats', catRouter)

module.exports = router