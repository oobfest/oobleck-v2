let express = require('express')
let controller = require('./controller')
let isLoggedIn = require('../is-logged-in')

let router = express.Router()

router.route('/')
  .post(isLoggedIn, controller.create)
  .get(isLoggedIn, controller.read)

router.route('/validate-performer-email/')
  .post(controller.validatePerformerEmail)

router.route('/:id')
  .get(isLoggedIn, controller.read)
  .put(isLoggedIn, controller.update)

module.exports = router