let mongoose = require('mongoose')

module.exports = mongoose.Schema({
  zipCode: String,
  race: String,
  special: [String]
})
