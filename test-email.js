require('dotenv').config()
let emailer = require('./utilities/nodemailer')

emailer
  .sendEmail("sld.potato@gmail.com", "TEST", "this is some <b>content</b> for you")
  .then((email)=> {
    console.log("Email sent 💌", email.envelope)
  })
  .catch((error)=> {
    console.log("Email error 💔", error)
  })