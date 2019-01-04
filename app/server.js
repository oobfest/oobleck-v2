const util  = require('util')
const express = require('express')

module.exports = port=> {

  let server = express()
  server.use(express.json())  

  // Todo: API

  let connection = server.listen(port)
  return new Promise((resolve, reject)=> {
    connection.on('listening', ()=> resolve(connection))
    connection.on('error', error=> reject(error))
  })

}