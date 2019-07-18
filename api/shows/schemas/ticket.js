let mongoose = require('mongoose')

let TicketSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  quantity: Number,
  type: String,
  payment: {}
})

module.exports = TicketSchema