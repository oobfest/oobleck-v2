let mongoose = require('mongoose')

let TicketSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  quantity: Number,
  type: String,
  checkedIn: Boolean,
  payment: {}
})

module.exports = TicketSchema
