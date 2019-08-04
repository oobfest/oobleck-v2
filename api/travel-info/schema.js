let mongoose = require('mongoose')

module.exports = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  actName: String,
  wantsRide: Boolean,
  arrival: {
    date: String,
    time: String,
    airline: String,
    flightNumber: String,
    dropOffAddress: String
  },
  departure: {
    date: String,
    time: String,
    airline: String,
    flightNumber: String,
    pickUpAddress: String
  }
})