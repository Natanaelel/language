const fs = require("fs")


const tokenize = require("./tokenizer.js")
// const parse = require("./parser.js")
const Parser = require("./parser_class.js")
const stringify = require("./stringify.js")
const evaluate = require("./interpreter.js")

const patterns = require("./patterns.js")


let code = fs.readFileSync("./code.mylang").toString()

let temp = console.log
console.log = null
console.log = (x) => process.stdout.write(`${x}`)

function runCode(code){
    let tokenized = tokenize(code, patterns)
    tokenized = tokenized.filter(({type}) => type != "whitespace")
    let parser = new Parser(tokenized)
    let parsed = parser.parseProgram()
    let settings = {
        "log_line": true
    }
    let evaluated = evaluate(parsed, settings)
    return evaluated
}

runCode(code)