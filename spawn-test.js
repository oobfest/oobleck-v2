
// Run `npm test` to tap all tests
// Run `npm test -- [entity]` to test entity

let { spawn } = require('child_process')

let bin = './node_modules/.bin'
let path = process.argv[2] || "**"

let tapTest = spawn(`${bin}/tap`, [`api/${path}/test.js`])
let tapTestSpec = spawn(`${bin}/tap-spec`, ['--color'])

tapTest.stdout.on('data', (data)=> {
  tapTestSpec.stdin.write(data)
})

tapTest.on('close', ()=> { 
  tapTestSpec.stdin.end() 
})

tapTestSpec.stdout.on('data', (data)=> {
  process.stdout.write(data)
})