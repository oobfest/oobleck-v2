require('dotenv').config()

let tap = require('tap')
let setupTestDatabase = require('./setup/test-database')
let setupMongoose = require('./setup/mongoose')
let setupServer = require('./setup/server')

module.exports = {
  assemble() {
    tap.test("Assemble", async tap=> {
      this.testDatabase = setupTestDatabase()
      let connectionString = await this.testDatabase.getConnectionString()
      this.mongoose = await setupMongoose(connectionString)
      this.server = await setupServer(process.env.PORT)
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