let split = require('split2')
let pump = require('pump')
let through = require('through2')

let transport = through.obj(function (chunk, encoding, callback) {

  // TODO
  console.log(chunk)
  callback()
})

pump(process.stdin, split(JSON.parse), transport)