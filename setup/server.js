let express = require('express')
let setupPassport = require('./passport')

module.exports = port=> {
  let server = express()
  server.set('view engine', 'pug')
  server.set('views', 'website')

  server.use(express.urlencoded({ extended: true }))
  server.use(express.json())
  server.use(express.static('website/static'))

  // Passport.js
  setupPassport(server)

  let apiRouter = require('../api/router')
  let websiteRouter = require('../website/router')
  server.use('/api', apiRouter)
  server.use('/', websiteRouter)

  let connection = server.listen(port)
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