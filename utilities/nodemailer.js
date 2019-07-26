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
  sendEmail(recipients, subject="", htmlContent="", sender="no-reply@oobfest.com") {
    let email = {
      to: recipients,
      from: sender,
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
  },
  sendEmailFromProducers(recipients, subject="", htmlContent="") {
    let email = {
      to: recipients,
      from: 'producers@oobfest.com',
      subject: "[OoB] " + subject,
      html: htmlContent
    }
    return transporter
      .sendMail(email)
      .then((response)=> {
        console.log(`Email sent 💌 "${email.subject}"`)
        console.log(`From ${response.envelope.from} to ${response.envelope.to}`)
      })
      .catch((error)=> {
        console.log("Email error 💔")
        console.log(JSON.stringify(error))
      })
  },
}