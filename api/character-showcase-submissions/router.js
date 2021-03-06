let express = require('express')
let controller = require('./controller')
let isLoggedIn = require('../is-logged-in')

let router = express.Router()

router.route('/')
  .get(isLoggedIn, controller.read)
  .post(controller.create)

router.route('/:id')
  .get(isLoggedIn, controller.read)
  .put(isLoggedIn, controller.update)
  .delete(isLoggedIn, controller.destroy)

module.exports = router