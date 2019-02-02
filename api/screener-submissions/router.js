let express = require('express')
let router = express.Router()
let controller = require('./controller')
let isLoggedIn = require('../is-logged-in')

router.route('/')
  .get(isLoggedIn, controller.getAll)
  .post(controller.create)

router.route('/:id')
  .get(isLoggedIn, controller.getById)
  .put(isLoggedIn, controller.update)
  .delete(isLoggedIn, controller.destroy)

module.exports = router