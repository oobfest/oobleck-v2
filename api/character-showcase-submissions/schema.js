let mongoose = require('mongoose')
let ImageSchema = require('../act-submissions/schemas/image')
let SocialMediaSchema = require('./schemas/social-media')

module.exports = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  accolades: String,
  videoUrl: String,
  videoInfo: String,
  image: ImageSchema,
  social: SocialMediaSchema,
  accepted: Boolean
})