let model = require('./model')
let createController = require('../create-controller')

let overrides = null

module.exports = createController(model, overrides)