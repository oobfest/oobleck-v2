let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')

let mongooseModel = mongoose.model('User', schema)

let overrides = {
  
  create(user) {
    return new Promise((resolve, reject)=> {
      let userModel = new mongooseModel(user)
      mongooseModel.register(userModel, user.password, (error, user)=> {
        if(error) reject(error)
        else resolve(user)
      })
    })
  }, 

  setPassword(objectId, password) {
    return new Promise((resolve, reject)=> {
      mongooseModel.get(objectId, (error, user)=> {
        if(error) reject(error)
        if(user == null) reject(Error("User not found"))
        user.setPassword(password, (error)=> {
          if(error) reject(error)
          user.isPasswordSet = true
          mongooseModel.save(user, (error, savedUser)=> {
            if(error) reject(error)
            else resolve(savedUser)
          })
        })
      })
    })
  },

  changePassword(objectId, oldPassword, newPassword) {
    return new Promise((resolve, reject)=> {
      mongooseModel.get(objectId, (error, user)=> {
        if(error) reject(error)
        if(user == null) reject(Error("User not found"))
        user.changePassword(oldPassword, newPassword, (error)=> {
          if(error) reject(error)
          mongooseModel.save(user, (error, savedUser)=> {
            if(error) reject(error)
            else resolve(savedUser)
          })
        })
      })      
    })
  },
}

module.exports = createModel(mongooseModel, overrides)