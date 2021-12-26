const fs = require("fs")


const tokenize = require("./tokenizer.js")
const parse = require("./parser.js")
const stringify = require("./stringify.js")
const evaluate = require("./interpreter.js")

const patterns = require("./patterns.js")


let code = fs.readFileSync("./code.txt").toString()

// code = fs.readFileSync("./code2.txt").toString()
code = fs.readFileSync("./code3.mylang").toString()

// console.log(code)



let tokenized = tokenize(code, patterns)


// console.log(tokenized)

tokenized = tokenized.filter(({type}) => type != "whitespace")
console.log(tokenized)

// let log = console.log
// console.log = x => x

// let parsed = parse(tokenized)
// console.log = log

// console.log(parsed)
// console.log(JSON.stringify(parsed,0,2))

// console.log(tokenized.map(x=>x[1]).join(""))
// console.log(stringify(tokenized))



let Parser = require("./parser_class.js")
let parser = new Parser(tokenized)

let parsed = parser.parseProgram()

let evaluated = evaluate(parsed)
console.log(evaluated)
