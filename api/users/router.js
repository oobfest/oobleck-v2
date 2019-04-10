let express = require('express')
let controller = require('./controller')
let router = express.Router()
let isLoggedIn = require('../is-logged-in')


router.route('/')
  .get(isLoggedIn, controller.read)
  .post(isLoggedIn, controller.create)

router.route('/login')
  .post(controller.login)

router.route('/logout')
  .post(controller.logout)

router.route('/password')
  .post(isLoggedIn, controller.setPassword)
  .put(isLoggedIn, controller.changePassword)

router.route('/:id')
  .get(isLoggedIn, controller.read)
  .put(isLoggedIn, controller.update)
  .delete(isLoggedIn, controller.destroy)

module.exports = router