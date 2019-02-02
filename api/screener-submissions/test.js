let test = require('../../test')
let axios = require('../../utilities/axios')

let testScreenerSubmissions = [
  {
    name: "Garfield", 
    email: "garf@example", 
    phone:"555-5555", 
    city: "Cleveland", 
    state: "Ohio",
    homeTheater: "ColdTowne",
    whatYouWatch: "Lasagna",
    whatYouPerform: "I hate Mondays",
    comedicRoleModels: "Odie",
    whyYou: "Who else?",
    conflicts: "All of May",
    hasScreenedBefore: false,
    haveYouScreenedBefore: ""
  }, 
  {
    name: "Nermal", 
    email: "nermy@example", 
    phone:"653-7654", 
    city: "Missoula",
    state: "Montana",
    homeTheater: "The Hideout",
    whatYouWatch: "Florida",
    whatYouPerform: "Florida",
    comedicRoleModels: "FloRida",
    whyYou: "Floring",
    conflicts: "Riders",
    hasScreenedBefore: true,
    haveYouScreenedBefore: "In 2016"
  }
]

test.assemble()

test.run("Create screener submission", async (tap)=> {
  let response = await axios.post('/api/screener-submissions', testScreenerSubmissions[0])
  tap.ok(response, "Response received")
  tap.ok(response.status === 200, "200 status code")
  tap.ok(response.data.name === testScreenerSubmissions[0].name, "Name property")
  tap.ok(response.data.email === testScreenerSubmissions[0].email, "email property")
  tap.ok(response.data.phone === testScreenerSubmissions[0].phone, "phone property")
  tap.ok(response.data.city === testScreenerSubmissions[0].city, "city property")
  tap.ok(response.data.state === testScreenerSubmissions[0].state, "state property")
  tap.ok(response.data.homeTheater === testScreenerSubmissions[0].homeTheater, "homeTheater property")
  tap.ok(response.data.whatYouWatch === testScreenerSubmissions[0].whatYouWatch, "whatYouWatch property")
  tap.ok(response.data.whatYouPerform === testScreenerSubmissions[0].whatYouPerform, "whatYouPerform property")
  tap.ok(response.data.comedicRoleModels === testScreenerSubmissions[0].comedicRoleModels, "comedicRoleModels property")
  tap.ok(response.data.whyYou === testScreenerSubmissions[0].whyYou, "whyYou property")
  tap.ok(response.data.conflicts === testScreenerSubmissions[0].conflicts, "conflicts property")
  tap.ok(response.data.hasScreenedBefore === testScreenerSubmissions[0].hasScreenedBefore, "hasScreenedBefore property")
  tap.ok(response.data.haveYouScreenedBefore === testScreenerSubmissions[0].haveYouScreenedBefore, "haveYouScreenedBefore property")
  testScreenerSubmissions[0].id = response.data._id
})

test.run("Create second screener submission", async(tap)=> {
  let response = await axios.post('/api/screener-submissions', testScreenerSubmissions[1])
  testScreenerSubmissions[1].id = response.data._id
})

test.run("Get both", async (tap)=> {
  let response = await axios.get('/api/screener-submissions')
  tap.ok(response, "Response received")
  tap.ok(response.status === 200, "200 status code")
  // Can't test without authentication... :(
})

test.disassemble()