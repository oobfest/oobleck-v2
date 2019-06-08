let mongoose = require('mongoose')
let PersonnelSchema = require('../../act-submissions/schemas/personnel')
let ImageSchema = require('../../act-submissions/schemas/image')

let ActSchema = mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  showTitle: {
    required: false,
    type: String
  },
  showType: {
    required: true,
    type: [{
      required: true,
      type: String,
    }],
  },
  headliner: {
    required: false,
    type: Boolean
  },
  publicDescription: {
    required: true,
    type: String
  },
  country: {
    required: true,
    type: String,
    uppercase: true
  },
  state: {
    required: false,
    type: String
  },
  city: {
    required: true,
    type: String
  },
  home: {
    required: false,
    type: String
  },
  personnel: {
    required: true,
    type: [PersonnelSchema]
  },
  image: {
    required:true,
    type: ImageSchema
  },

  duration: {
    required: true,
    type: Number,
    default: 0
  }
})

module.exports = ActSchema