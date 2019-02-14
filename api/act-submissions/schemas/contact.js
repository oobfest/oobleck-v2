let mongoose = require('mongoose')

let ContactSchema = mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  phone: {
    required: true,
    type: String
  },
  role: {
    required: true,
    lowercase: true,
    type: String,
    enum: [
      'performer',
      'crew',
      'director',
      'producer',
      'other'
    ]
  },
  attending: {
    required: true,
    type: Boolean
  },
})

module.exports = ContactSchema