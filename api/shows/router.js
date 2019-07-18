let express = require('express')
let createRouter = require('../create-router')
let controller = require('./controller')

let router = express.Router()

router.post('/add-act', controller.addAct)
router.post('/remove-act/:actId', controller.removeAct)
router.post('/refresh', controller.refresh)

module.exports = createRouter(router, controller)