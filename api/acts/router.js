let express = require('express')
let controller = require('./controller')
let isLoggedIn = require('../is-logged-in')

let router = express.Router()

router.use(isLoggedIn)

router.route('/')
  .post(controller.create)
  .get(controller.read)

router.route('/validate-performer-email/')
  .post(controller.validatePerformerEmail)

router.route('/:id')
  .get(controller.read)
  .put(controller.update)

module.exports = router