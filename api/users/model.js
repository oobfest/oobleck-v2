let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')

let mongooseModel = mongoose.model('User', schema)

let overrides = {
  create(user) {
    return new Promise((resolve, reject)=> {
      let userModel = new mongooseModel({username: user.username})
      mongooseModel.register(userModel, user.password, (error, user)=> {
        if(error) reject(error)
        else resolve(user)
      })
    })
  }
}

module.exports = createModel(mongooseModel, overrides)