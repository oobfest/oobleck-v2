let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')

let mongooseModel = mongoose.model('show', schema)
let overrides = {
  async addAct(show, act) {
    show.acts.push(act)
    return show
  },
  async removeAct(showId, actId) {
    let show = await mongooseModel.findById(showId).exec()
    let actIndex = show.acts.findIndex(a=> a._id == actId)
    show.acts.splice(actIndex, 1)
    show.markModified('acts')
    return show
  },
  async addHost(show, host) {
    show.host = host
    return show
  },
  async removeHost(show) {
    show.host = null
    return show
  }
}

module.exports = createModel(mongooseModel, overrides)