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

  // Use NGiNX for static if not in production
  if(process.env.NODE_ENV != 'production')
    app.use(express.static('website/static'))

  // IN THE MEANTIME
  app.use(helmet())

  // Passport.js
  setupPassport(app)

  // Morgan
  if(process.env.NODE_ENV != 'production') {
    setupMorgan(app)
  }

  let apiRouter = require('../api/router')
  let websiteRouter = require('../website/router')
  app.use('/api', apiRouter)
  app.use('/', websiteRouter)

  let connection = app.listen(port)
  return new Promise((resolve, reject)=> {
    connection.on('listening', ()=> {
      let connectionPort = connection.address().port
      console.log(`💫 Server listening on port ${connectionPort}`)
      resolve(connection)
    })
    connection.on('error', error=> reject(error))
    connection.on('close', ()=> {
      console.log(`Closed port ${connectionPort}`)
    })
  })
}
