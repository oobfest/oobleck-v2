let express = require('express')
let controller = require('./controller')
let isLoggedIn = require('../is-logged-in')

let router = express.Router()

router.use(isLoggedIn)

router.route('/')
  .get(controller.read)

router.route('/:id')
  .get(controller.read)
  .put(controller.update)

module.exports = router