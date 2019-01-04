let connectDatabase = require('./app/database')
let connectServer = require('./app/server')

const connectionString = 'mongodb://localhost:27017/2019-test'
const port = 5000

let setupApp = async ()=> {
  let database = await connectDatabase(connectionString)
  let server = await connectServer(port)
}

setupApp()