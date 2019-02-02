let express = require('express')
let helmet = require('helmet')
let cookieSession = require('cookie-session')

let setupPassport = require('./passport')
let setupMorgan = require('./morgan')


module.exports = port=> {
  let app = express()
  app.set('view engine', 'pug')
  app.set('views', 'website')

  app.use(cookieSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(express.static('website/static'))
  app.use(helmet())

  // Passport.js
  setupPassport(app)

  // Morgan
  setupMorgan(app)

  let apiRouter = require('../api/router')
  let websitePublicRouter = require('../website/public-router')
  let websitePrivateRouter = require('../website/private-router')
  app.use('/api', apiRouter)
  app.use('/', websitePublicRouter)
  app.use('/', websitePrivateRouter)

  let connection = app.listen(port)
  return new Promise((resolve, reject)=> {
    let connectionPort = connection.address().port
    connection.on('listening', ()=> {
      console.log(`💫 Server listening on port ${connectionPort}`)
      resolve(connection)
    })
    connection.on('error', error=> reject(error))
    connection.on('close', ()=> {
      console.log(`Closed port ${connectionPort}`)
    })
  })

}