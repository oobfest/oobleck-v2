let model = require('./model')
let createController = require('../create-controller')

let overrides = {
  
  async setPassword(request, response) {
    try {
      let id = request.body.id
      let password = request.body.password
      await model.setPassword(id, password)
      response.json({success: true})
    } 
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on setPassword()")
    }
  },

  async changePassword(request, response) {
    try {
      let id = request.body.id
      let oldPassword = request.body.oldPassword
      let newPassword = request.body.newPassword
      await model.changePassword(id, oldPassword, newPassword)
      response.json({success: true})
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on changePassword()")
    }
  }
}

module.exports = createController(model, overrides)