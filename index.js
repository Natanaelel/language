const fs = require("fs")
const runCode = require("./run.js")

let code = fs.readFileSync(process.argv[2]).toString()

runCode(code)