const path = require('path')
const child_process = require('child_process')


// function send(s) {
  
// }

const child = child_process.spawn('node', [path.join(__dirname, 'child.js')], {
  stdio: ['pipe', 'pipe', 'inherit'],
})

child.stdout.on('data', (buf) => {
  console.log(buf.toString())
})

child.stdin.write('hello')

