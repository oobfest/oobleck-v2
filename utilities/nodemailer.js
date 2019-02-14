let nodemailer = require('nodemailer')
let aws = require('aws-sdk')
let emailLogger = require('./email-logger')

// Be sure to include AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY & AWS_REGION
// And `require('dotenv').config()`
let transporter = nodemailer.createTransport({
  SES: new aws.SES({apiVersion: "2010-12-01"}),
  sendingRate: 1
})

module.exports = {
  sendEmail(recipient, subject="", htmlContent="") {
    let email = {
      to: recipient,
      from: 'no-reply@oobfest.com',
      subject: "[OoB] " + subject,
      html: htmlContent
    }
    return transporter
      .sendMail(email)
      .then((response)=> {
        emailLogger.info(`Email sent 💌 "${email.subject}"`)
        emailLogger.info(`From ${response.envelope.from} to ${response.envelope.to}`)
      })
      .catch((error)=> {
        emailLogger.error("Email error 💔")
        emailLogger.error(JSON.stringify(error))
      })
  }
}