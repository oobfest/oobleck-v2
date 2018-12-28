
let express = require('express')
let app = express()
app.use(express.json())

app.get('/', (request, response)=> {
  response.send({cool: true})
})

app.listen(5000)