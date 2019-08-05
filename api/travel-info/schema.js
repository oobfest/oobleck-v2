let mongoose = require('mongoose')

module.exports = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  actName: String,
  wantsArrivalRide: Boolean,
  arrival: {
    date: String,
    time: String,
    airline: String,
    flightNumber: String,
    dropOffAddress: String
  },
  wantsDepartureRide: Boolean,
  departure: {
    date: String,
    time: String,
    airline: String,
    flightNumber: String,
    pickUpAddress: String
  }
})