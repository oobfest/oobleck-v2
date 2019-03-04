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
  },

  async createReview(request, response) {
    try {
      let submissionId = request.body.submissionId
      let review = {
        userId: request.body.userId,
        username: request.body.username,
        score: request.body.score,
        notes: request.body.notes
      }
      let data = await model.createReview(submissionId, review)
      response.json(data)
    }
    catch(error) {
      response.status(500).send("Error on createReview()")
    }
  },

  async removeReview(request, response) {
    try {
      let submissionId = request.body.submissionId
      let userId = request.body.userId
      let data = await model.removeReview(submissionId, userId)
      response.json(data)
    }
    catch(error) {
      response.status(500).send("Error on removeReview()")
    }
  }
}

module.exports = createController(model, overrides)