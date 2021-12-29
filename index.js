const fs = require("fs")


const tokenize = require("./tokenizer.js")
const Parser = require("./parser_class.js")
const stringify = require("./stringify.js")
const evaluate = require("./interpreter.js")

const patterns = require("./patterns.js")


let code = fs.readFileSync("./code.mylang").toString()
code = fs.readFileSync("./code2.mylang").toString()



function runCode(code){
    let tokenized = tokenize(code, patterns)
    tokenized = tokenized.filter(({type}) => type != "whitespace")
    let parser = new Parser(tokenized, false)
    let parsed = parser.parseProgram()
    let settings = {
        "log_line": false
    }
    // console.log(JSON.stringify(parsed, null, 2))
    let evaluated = evaluate(parsed, settings)
    return evaluated
}

// runCode(code)
runCode(code.replace(/#.*/g,""))