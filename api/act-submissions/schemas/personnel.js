let mongoose = require('mongoose')

let PersonnelSchema = mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  role: {
    required: true,
    type: String,
    enum: [
      'Performer',
      'Crew',
      'Director',
      'Producer',
      'Other'
    ]
  },
})

module.exports = PersonnelSchema