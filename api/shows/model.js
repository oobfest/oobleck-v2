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
  },

  async addTicket(showId, ticket) {
    let show = await mongooseModel.findById(showId).exec()

    // Show is sold out
    if(show.remaining <= 0) return { reservationSuccessful: false, message: "Show is sold out"}

      // Not enough tickets remaining for requested quantity
    else if (ticket.quantity > show.remaining) return { reservationSuccessful: false, message: `There are less than ${ticket.quantity} tickets available for this show`}

    else {
      show.tickets.push(ticket)
      show.remaining = (show.remaining - ticket.quantity)
      show.markModified('tickets')
      return await show.save()
    }
  },

  async removeTicket(showId, ticketId) {
    let show = await mongooseModel.findById(showId).exec()
    let ticketIndex = show.tickets.findIndex(t=> t._id == ticketId)
    show.remaining += Number(show.tickets[ticketIndex].quantity)
    show.tickets.splice(ticketIndex, 1)
    return await show.save()
  },

  async setCapacity(showId, capacity) {
    let show = await mongooseModel.findById(showId).exec()
    if (show.capacity == undefined) show.remaining = capacity
    else show.remaining = capacity - (show.capacity - show.remaining)
    show.capacity = capacity
    return await show.save()
  }
}

module.exports = createModel(mongooseModel, overrides)