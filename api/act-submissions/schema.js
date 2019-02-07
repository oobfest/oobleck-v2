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

let ImageSchema = mongoose.Schema({
  id: {
    required: true,
    type: String
  },
  url:{
    required: true,
    type: String
  },
  deleteUrl: {
    required: true,
    type: String
  }
})

let SubmissionSchema = mongoose.Schema({
  submissionDate: {
    type: Date,
    default: Date.now
  },
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
      enum: [
        'improv', 
        'sketch', 
        'standup', 
        'podcast', 
        'teacher', 
        'musical', 
        'one-person-show', 
        'variety', 
        'other'
      ]
    }],
  },
  privateDescription: {
    required: true,
    type: String
  },
  publicDescription: {
    required: true,
    type: String
  },
  accolades: {
    required: false,
    type: String
  },
  country: {
    required: true,
    type: String
  },
  state: {
    required: true,
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
  contact: {
    required: true,
    type: ContactSchema
  },
  minimumLength: {
    required: true,
    default: 0,
    min: 0,
    max: 2400,
    type: Number
  },
  maximumLength: {
    required: true,
    default: 0,
    min: 0,
    max: 2400,
    type: Number
  },
  specialRequirements: {
    required: false,
    type: String
  },
  messy: {
    required: true,
    type: Boolean
  },
  videoUrls: {
    required: true,
    type: [String]
  },
  videoInfo: {
    required: false,
    type: String
  },
  image: {
    required:true,
    type: {}//ImageSchema
  },
  socialMedia: [],
  availability: {
    required: true,
    type: [{
      required: true,
      type: String,
      lowercase: true,
      enum: [
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
        'monday'
      ]
    }],
  },
  travelAgreement: {
    required: true,
    type: String
  }
})

module.exports = SubmissionSchema