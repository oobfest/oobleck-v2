let mongoose = require('mongoose')

let studentSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  auditing: Boolean,
  quantity: Number,
  refunded: {
    type: Boolean,
    default: false
  },
  payment: {}
})

module.exports = studentSchema