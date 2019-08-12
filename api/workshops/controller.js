let model = require('./model')
let createController = require('../create-controller')

let overrides = {
  async getPublic(request, response) {
    try {
      let workshopId = request.params.workshopId
      let workshop = await model.getPublic(workshopId)
      response.json(workshop)
    }
    catch(error) {
      console.log(error)
      response.status(500).send({ok: false})
    }
  }
}

module.exports = createController(model, overrides)