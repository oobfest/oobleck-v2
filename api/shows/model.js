let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')
let mongooseModel = mongoose.model('show', schema)
let actModel = require('../acts/model')

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
  },
  async refresh() {
    let shows = await mongooseModel.find()
    let acts = await actModel.read()

    for (show of shows) {
      for (oldAct of show.acts) {
        for (newAct of acts) {
          if (oldAct.name == newAct.name) {
            oldAct.image = newAct.image
            oldAct.publicDescription = newAct.publicDescription
            oldAct.showType = newAct.showType
          }
        }
      }
      show.markModified('acts')
      mongooseModel.findByIdAndUpdate(show._id, show, {new: true}).lean().exec()
    }
  }
}

module.exports = createModel(mongooseModel, overrides)