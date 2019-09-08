let test = require('../../test')
let axios = require('../../utilities/axios')

let testCats = [
  {name: "Garfield", age: 21},
  {name: "Nermal", age: 5}
]

test.assemble()

test.run("Create cat", async (tap)=> {
  let response = await axios.post('/api/cats', testCats[0])
  tap.ok(response, "Response received")
  tap.ok(response.status === 200, "200 status code")
  tap.ok(response.data.name === testCats[0].name, "Name property")
  tap.ok(response.data.age === testCats[0].age, "Age property")
  testCats[0].id = response.data._id
})

test.run("Create second cat", async(tap)=> {
  let response = await axios.post('/api/cats', testCats[1])
  testCats[1].id = response.data._id  
})

test.run("Get both cats", async (tap)=> {
  let response = await axios.get('/api/cats')
  tap.ok(response, "Response received")
  tap.ok(response.status === 200, "200 status code")
  tap.ok(response.data.length === 2, "Got two cats")
})

test.run("Update first cat", async (tap)=> {
  let response = await axios.put(`/api/cats/${testCats[0].id}`, {name: "Arlene"})
  tap.ok(response, "Response received")
  tap.ok(response.status === 200, "200 status code")
  tap.ok(response.data.name === "Arlene", "Name updated")
  tap.ok(response.data.age === testCats[0].age, "Age unchanged")
})

test.run("Delete second cat", async (tap)=> {
  let deleteResponse = await axios.delete(`/api/cats/${testCats[1].id}`)
  tap.ok(deleteResponse, "Response received")
  tap.ok(deleteResponse.status === 200, "200 status code")

  let getResponse = await axios.get('/api/cats')
  tap.ok(getResponse.data.length === 1, "Only one cat left")
})

test.disassemble()