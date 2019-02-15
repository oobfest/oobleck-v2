let model = require('./model')
let createController = require('../create-controller')

let overrides = {
  async addPromoCode(request, response) {
    try {
      let submissionId = request.body.submissionId
      let promoCode = request.body.promoCode
      let data = await model.addPromoCode(submissionId, promoCode)
      response.json(data)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on addPromoCode()")
    }
  }
}

module.exports = createController(model, overrides)