let mongoose = require('mongoose')
let passportLocalMongoose = require('passport-local-mongoose')

let User = mongoose.Schema({
  username: String
})

// This adds "hash" and "salt" properties for securely storing User's password
User.plugin(passportLocalMongoose)

module.exports = User