let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')

let mongooseModel = mongoose.model('badge', schema)
let overrides = {
  async getByEmail(unsafeEmail) {
    // TODO: Shouldn't do findOne, what if performer buys all-access for partner?
    let safeEmail = unsafeEmail.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    let safeEmailRegex = new RegExp('^' + safeEmail + '$', 'i')
    return mongooseModel.findOne({email: safeEmailRegex})
  },
}

module.exports = createModel(mongooseModel, overrides)