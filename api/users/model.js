let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')

let mongooseModel = mongoose.model('user', schema)

let overrides = {

  create(user) {
    if(user.password) {
      let userModel = new mongooseModel(user)
      userModel.isPasswordSet = true
      return new Promise((resolve, reject)=> {
        mongooseModel.register(userModel, user.password, (error, user)=> {
          if(error) reject(error)
          else resolve(user)
        })
      })
    }
    else {
      user.isPasswordSet = false
      return mongooseModel.create(user)
    }
  },

  setPassword(id, password) {
    return new Promise((resolve, reject)=> {
      mongooseModel.findById(id, (error, user)=> {
        if(error) reject(error)
        if(user == null) reject(Error("User not found"))
        user.setPassword(password, (error)=> {
          if(error) reject(error)
          user.isPasswordSet = true
          user.save(user, (error, savedUser)=> {
            if(error) reject(error)
            else resolve(savedUser)
          })
        })
      })
    })
  },

  changePassword(id, oldPassword, newPassword) {
    return new Promise((resolve, reject)=> {
      mongooseModel.findById(id, (error, user)=> {
        if(error) reject(error)
        if(user == null) reject(Error("User not found"))
        user.changePassword(oldPassword, newPassword, (error)=> {
          if(error) reject(error)
          user.save(user, (error, savedUser)=> {
            if(error) reject(error)
            else resolve(savedUser)
          })
        })
      })
    })
  },
}

module.exports = createModel(mongooseModel, overrides)