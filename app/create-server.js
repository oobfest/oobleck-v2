let express = require('express')
let bodyParser = require('body-parser')
let setupPassport = require('./setup-passport')

module.exports = port=> {
  let server = express()
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(express.json())
  
  // Sucks
  let passport = setupPassport(server)
  let routes = require('../api/routes')
  server.use('/', routes)

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