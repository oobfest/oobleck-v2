let net = require('net')

let server = net.createServer((connection)=> {
  connection.end("Hello!\n")
})

server.listen(5000)