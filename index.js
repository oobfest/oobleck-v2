
let express = require('express')
let app = express()
app.use(express.json())

app.get('/cool', (request, response)=> {
  response.send({cool: true})
})

app.listen(5000)