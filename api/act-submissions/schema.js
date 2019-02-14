let mongoose = require('mongoose')

let ContactSchema = require('./schemas/contact')
let ImageSchema = require('./schemas/image')
let PersonnelSchema = require('./schemas/personnel')
let SocialMediaSchema = require('./schemas/social-media')

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
  contact: {
    required: true,
    type: ContactSchema
  },
  personnel: {
    required: true,
    type: [PersonnelSchema]
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
  notMessy: {
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
    type: ImageSchema
  },
  socialMedia: {
    required: false,
    type: [SocialMediaSchema]
  },
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
  },
  paid: {
    required: true,
    type: Boolean,
    default: false
  }
})

module.exports = SubmissionSchema