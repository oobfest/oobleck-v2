require('dotenv').config()

let tap = require('tap')
let createTestDatabase = require('./app/create-test-database')
let connectMongoose = require('./app/connect-mongoose')
let createServer = require('./app/create-server')

module.exports = {
  assemble() {
    tap.test("Assemble", async tap=> {
      this.testDatabase = createTestDatabase()
      let connectionString = await this.testDatabase.getConnectionString()
      this.mongoose = await connectMongoose(connectionString)
      this.server = await createServer(process.env.PORT)
      tap.end()
    })
  },
  run(description, behavior) {
    tap.test(description, async tap=> {
      try { await behavior(tap) }
      catch(error) { tap.fail(error.message) }
      tap.end()
    })
  },
  disassemble() {
    tap.test("Disassemble", tap=> {
      this.server.close()
      this.mongoose.connection.close()
      this.testDatabase.stop()
      tap.end()
    })
  }
}