let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')
let nodemailer = require('../../utilities/nodemailer')
let mongooseModel = mongoose.model('screener-submission', schema)

let sendEmail = function(submission) {
  let emailContent = "<h1>New Screener Submission</h1><br>"
  for(let key in submission) {
    emailContent += `<b>${key}:</b>${submission[key]}<br>`
  }
  nodemailer.sendEmail(process.env.SUBMISSION_EMAIL, `New Screener Submission: ${submission.name}`, emailContent)
}

let overrides = {
  create(submission) {
    // Send email
    sendEmail(submission)
    // Save submission
    return mongooseModel.create(submission)
  }
}


module.exports = createModel(mongooseModel, overrides)