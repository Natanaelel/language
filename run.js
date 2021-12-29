const tokenize = require("./tokenizer.js")
const Parser = require("./parser_class.js")
const evaluate = require("./interpreter.js")

const patterns = require("./patterns.js")



module.exports = function(code){
    let tokenized = tokenize(code, patterns)
    let parser = new Parser(tokenized, false)
    let parsed = parser.parseProgram()
    let settings = {
        "pretty_running_program_sign": false
    }
    return evaluate(parsed, settings)
}