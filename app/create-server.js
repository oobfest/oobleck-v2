const express = require('express')

module.exports = port=> {

  let server = express()
  server.use(express.json())

  let routes = require('../api/routes')
  server.use('/', routes)

  let connection = server.listen(port)
  return new Promise((resolve, reject)=> {
    connection.on('listening', ()=> {
      let connectionPort = connection.address().port
      console.log(`Listening on port ${connectionPort}`)
      resolve(connection)
    })
    connection.on('error', error=> reject(error))
  })

}