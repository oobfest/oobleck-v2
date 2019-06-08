let express = require('express')
let createRouter = require('../create-router')
let controller = require('./controller')

let router = express.Router()

module.exports = createRouter(router, controller)