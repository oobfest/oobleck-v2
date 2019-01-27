let test = require('../../test')
let axios = require('../../utilities/axios')

test.assemble()

test.run("Create user", async (tap)=> {
  let response = await axios.post('/api/users', {username: "Garfield", password: "Lasagna"})
  tap.ok(response, "Response received")
  tap.ok(response.status === 200, "200 status code")
  tap.ok(response.data.username === "Garfield", "Username is Garfield")
})

test.run("Get users", async (tap)=> {
  let response = await axios.get('/api/users')
  tap.ok(response, "Response received")
  tap.ok(response.status === 200, "200 status code")
  tap.ok(response.data.length === 1, "Got one user")
  tap.ok(response.data[0].username === "Garfield", "It's Garfield!")
})

test.disassemble()