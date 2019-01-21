let test = require('../../test')
let axios = require('../../utilities/axios')

test.assemble()

test.run("Test dog", async (tap)=> {
  tap.ok(true, "Testin' dawgz")
})

test.run("Test dog 2", async (tap)=> {
  tap.ok(true, "Testin' dawgz 2")
})

test.disassemble()