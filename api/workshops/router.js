let express = require('express')
let createRouter = require('../create-router')
let controller = require('./controller')

let router = express.Router()

router.get('/public/:workshopId', controller.getPublic)
router.post('/refund/:workshopId', controller.refund)

module.exports = createRouter(router, controller)