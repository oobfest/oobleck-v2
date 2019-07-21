const mongoose = require('mongoose')
let ActSchema = require('./schemas/act')
let HostSchema = require('../hosts/schema')
let TicketSchema = require('./schemas/ticket')

let showSchema = mongoose.Schema({
  day: String,
  venue: String,

  startTime: Number,
  endTime: Number,

  capacity: Number,
  remaining: Number,
  price: Number,

  acts: [ActSchema],

  host: {
    required: false,
    default: null,
    type: HostSchema
  },

  tickets: [TicketSchema],

  url: String,

  volunteerBoxOffice1: mongoose.Schema.Types.ObjectId,
  volunteerBoxOffice2: mongoose.Schema.Types.ObjectId,
  volunteerTicketTaker1: mongoose.Schema.Types.ObjectId,
  volunteerTicketTaker2: mongoose.Schema.Types.ObjectId,
})

module.exports = showSchema