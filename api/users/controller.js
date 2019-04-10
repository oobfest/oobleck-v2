let model = require('./model')
let createController = require('../create-controller')
let passport = require('passport')

let overrides = {

  async login(request, response, next) {
    passport.authenticate('local', (authenticationError, user, info)=> {
      if(authenticationError) response.json({authenticationError})
      else if(!user) response.json({info})
      else request.logIn(user, (loginError)=>{
        if(loginError) response.json({loginError})
        else response.json({ok: true})
      })
    })(request, response, next)
  },

  async logout(request, response) {
    request.logout()
    response.json({ info: { message: "You have been logged out!" } })
  },

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