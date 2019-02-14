let mongoose = require('mongoose')

let SocialMediaSchema = mongoose.Schema({
  type: {
    required: true,
    type: String,
    enum: [
      'Website',
      'Twitter',
      'Facebook',
      'YouTube',
      'Instagram',
      'Snapchat',
      'Other'
    ]
  },
  url: {
    required: true,
    type: String
  }
})

module.exports = SocialMediaSchema