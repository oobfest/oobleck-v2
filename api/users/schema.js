let mongoose = require('mongoose')
let passportLocalMongoose = require('passport-local-mongoose')

let User = mongoose.Schema({
  username: String,
  isPasswordSet: Boolean,
  email: String,
  roles: [String],
})

// This adds "hash" and "salt" properties for securely storing User's password
// 'usernameLowerCase' converts username to lower case when saving and querying
User.plugin(passportLocalMongoose, {usernameLowerCase:true})

module.exports = User