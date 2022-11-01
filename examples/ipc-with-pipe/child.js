
function echo (s) {
  return process.stdout.write(s)
}
console.log('hello from child')

process.stdin.on('data', echo)