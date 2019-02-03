let express = require('express')
let createRouter = require('../create-router')
let controller = require('./controller')
let router = express.Router()

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