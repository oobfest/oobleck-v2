let model = require('./model')
let createController = require('../create-controller')

let overrides = {
  async addAct(request, response) {
    try {
      let show = request.body.show
      let act = request.body.act
      let updatedShow = await model.addAct(show, act)
      if(!updatedShow) response.status(404).json({message: "Error on addAct()"})
      let results = await model.update(show._id, updatedShow)
      if(!results) response.status(404).json({message: "Error on update()"})
      else response.json(results)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on addAct()")
    }
  },

  async removeAct(request, response) {
    try {
      let showId = request.body._id
      let actId = request.params.actId
      let updatedShow = await model.removeAct(showId, actId)
      let results = await model.update(showId, updatedShow)
      if(!results) response.status(404).json({message: "Error on update()"})
      else response.json(results)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on removeAct()")
    }
  },

  async refresh(request, response) {
    try {
      await model.refresh()
      response.json({ok: true})
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on refresh()")
    }
  },

  async addTicket(request, response) {
    try {
      let showId = request.body.showId
      let ticket = request.body.ticket
      let show = await model.addTicket(showId, ticket)
      response.json(show)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on addTicket()")
    }
  },

  async removeTicket(request, response) {
    try {
      let showId = request.body.showId
      let ticketId = request.body.ticketId
      let show = await model.removeTicket(showId, ticketId)
      response.json(show)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on removeTicket()")
    }
  },

  async setCapacity(request, response) {
    try {
      let showId = request.body.showId
      let capacity = request.body.capacity
      let show = await model.setCapacity(showId, capacity)
      response.json(show)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on setCapacity()")
    }
  }
}

module.exports = createController(model, overrides)