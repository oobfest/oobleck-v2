// Create a temporary in-memory database for testing

module.exports = ()=> {
  let MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer
  return new MongoMemoryServer({ instance: {dbName: 'oobleck-test'} })
}