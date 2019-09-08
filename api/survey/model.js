let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')

let mongooseModel = mongoose.model('survey', schema)
let overrides = null

module.exports = createModel(mongooseModel, overrides)
