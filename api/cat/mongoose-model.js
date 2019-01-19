let createMongooseModel = require('../create-mongoose-model')

let schema = {
  name: String,
  age: Number
}

module.exports = createMongooseModel('Cat', schema)