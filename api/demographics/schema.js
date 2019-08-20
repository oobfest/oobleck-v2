let mongoose = require('mongoose')

module.exports = mongoose.Schema({
  location: String,
  zipCode: String,
  race: String,
  special: [String]
})
