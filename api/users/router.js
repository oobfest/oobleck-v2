let express = require('express')
let controller = require('./controller')
let router = express.Router()
let isLoggedIn = require('../is-logged-in')

router.use(isLoggedIn)

router.route('/')
  .get(controller.read)
  .post(controller.create)

router.route('/password')
  .post(controller.setPassword)
  .put(controller.changePassword)

router.route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)

module.exports = router