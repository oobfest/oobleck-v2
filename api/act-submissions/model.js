let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')
let nodemailer = require('../../utilities/nodemailer')

let mongooseModel = mongoose.model('act-submission', schema)

let sendStaffEmail = function(submission) {

  let emailContent = "<h1>New Act Submission</h1>"
  for(let key in submission) {
    if(key != 'contact' && key != 'image')
    emailContent += `<b>${key}:</b>${submission[key]}<br>`
  }
  
  emailContent += '<h2>Contact</h2>'
  for(let key in submission.contact) {
    emailContent += `<b>${key}:</b>${submission.contact[key]}<br>`
  }
  
  emailContent += '<h2>Image</h2>'
  for(let key in submission.image) {
    emailContent += `<b>${key}:</b>${submission.image[key]}<br>`
  }

  nodemailer.sendEmail(process.env.SUBMISSION_EMAIL, `New Act Submission: ${submission.name}`, emailContent)
}

let sendConfirmationEmail = function(submission) {
  let emailContent = `${submission.contact.name},<br>We have recieved your application for ${submission.name}`
  nodemailer.sendEmail(submission.contact.email, `Application for ${submission.name} recieved`)
}

let overrides = {
  create(submission) {
    // Send emails
    sendStaffEmail(submission)
    sendConfirmationEmail(submission)
    // Save submission
    return mongooseModel.create(submission)
  }
}

module.exports = createModel(mongooseModel, overrides)