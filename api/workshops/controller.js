let model = require('./model')
let createController = require('../create-controller')

let overrides = {
  async getPublic(request, response) {
    try {
      let workshopId = request.body.workshopId
      return model.getPublic(workshopId)
    }
    catch(error) {
      console.log(error)
      response.status(500).send({ok: false})
    }
  }
}

module.exports = createController(model, overrides)