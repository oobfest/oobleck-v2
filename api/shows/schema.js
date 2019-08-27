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
  
  walkupAdmissionsPaid: Number,
  walkupAdmissionsPerformer: Number,
  walkupAdmissionsVolunteer: Number,

  acts: [ActSchema],

  host: {
    required: false,
    default: null,
    type: HostSchema
  },

  tickets: [TicketSchema],

  url: String,

  name: String,
  description: String
})

module.exports = showSchema