let express = require('express')
let createRouter = require('../create-router')
let controller = require('./controller')

let router = express.Router()

router.get('/lite-read', controller.liteRead)

router.post('/add-act', controller.addAct)
router.post('/remove-act/:actId', controller.removeAct)
router.post('/refresh', controller.refresh)

router.post('/ticket', controller.addTicket)
router.post('/remove-ticket', controller.removeTicket)
router.post('/set-capacity', controller.setCapacity)
router.post('/check-remaining-tickets/:showId', controller.setCapacity)
router.post('/add-badge-reservation/:showId', controller.addBadgeReservation)
router.post('/get-show', controller.getShow)

router.post('/check-in/:showId', controller.checkIn)

router.get('/refresh-tickets/:showId', controller.refreshTickets)

module.exports = createRouter(router, controller)