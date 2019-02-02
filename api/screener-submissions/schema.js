let mongoose = require('mongoose')

module.exports = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  state: String,
  homeTheater: String,
  aboutYou: String,
  whyYou: String,
  conflicts: String,
  previousExperience: String
})