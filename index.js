require('dotenv').config()

let connectDatabase = require('./app/database')
let connectServer = require('./app/server')

let setupApp = async ()=> {
  try {
    let database = await connectDatabase(process.env.CONNECTION_STRING)
    let server = await connectServer(process.env.PORT)    
    console.log("Ready!✨")
  }
  catch(error) {
    if(error.name == "Error") {
      if (error.code == "EADDRINUSE") console.error("Port unavailable")
      else console.error("Server connection error")
    }
    else if (error.name == "MongoNetworkError") {
      console.error("MongoDB Connection Error")
    }
  }
}

setupApp()