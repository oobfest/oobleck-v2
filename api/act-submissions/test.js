let test = require('../../test')
let axios = require('../../utilities/axios')

let model = require('./model')

test.assemble()

let id = null

test.run("Required fields", async tap=> {
  try {
    let response = await model.create({})
  }
  catch(error) {
    let errors = Object.keys(error.errors)
    tap.ok(errors.includes('name'), "Name is required")
    tap.ok(errors.includes('country'), "Country is required")
    tap.ok(errors.includes('city'), "City is required")
    tap.ok(errors.includes('publicDescription'), "Public description is required")
    tap.ok(errors.includes('privateDescription'), "Private description is required")
    tap.ok(errors.includes('messy'), "'Messy' is required")
    tap.ok(errors.includes('travelAgreement'), "Travel agreement is required")
    tap.ok(errors.includes('contact'), "Contact is required")
    tap.ok(errors.includes('image'), "Image is required")
    // ... lots more required
  }
})

test.run("Create submission", async tap=> {
  let submission = {
    name: "Garfield",
    privateDescription: "Experimental lasagna-based comedy",
    publicDescription: "See this cat LIVE",
    country: 'US',
    city: 'Austin',
    contact: {
      name: "Jim Davis",
      email: "jim@garfieldmail",
      phone: "555-555-5555",
      role: "PRODUCER",
      attending: false,
    },
    image: {
      junk: "Don't save me!",
      id: 'n/a',
      url: 'blah',
      deleteUrl: 'blah'
    },
    messy: false,
    travelAgreement: "Yes"
  }
  
  try {
    let response = await axios.post('api/act-submissions', submission)
    tap.ok(response, "Has a response!")
  }
  catch(error) {
    tap.notOk(error, "Should not throw an error!")
  }
})

test.disassemble()