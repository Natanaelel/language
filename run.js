const tokenize = require("./tokenizer.js")
const Parser = require("./parser.js")
const evaluate = require("./interpreter.js")

const patterns = require("./patterns.js")



module.exports = function(code){
    let tokenized = tokenize(code, patterns)
    // console.log(tokenized)
    let parser = new Parser(tokenized, false)
    
    let parsed = parser.parseProgram()
    // console.log(JSON.stringify(parsed,2,2))
    let settings = {
        "pretty_running_program_sign": false
    }
    return evaluate(parsed, settings)
}