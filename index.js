const fs = require("fs")


const tokenize = require("./tokenizer.js")


let code = fs.readFileSync("./code.txt").toString()


console.log(code.toString())



const patterns = [
    {
        "name": "whitespace",
        "pattern": /^\s+/,
        "match": "$0"
    },
    {
        "name": "int",
        "pattern": /^(0|[1-9]\d*)/,
        "match": "$1"
    },
    {
        "name": "identifier",
        "pattern": /^[a-z]\w*/i,
        "match": "$0"
    },
    {
        "name": "operator",
        "pattern": /^(=|==|>|>=|<|<=|!=|===|!==|\+|\+=|-|-=|\*|\*=|\/|\/=|&&|\|\|\?\?|&|\||\^|~|\?|:)/,
        "match":  "$1",
        "comment": "= == > >= < <= != === !== + += - -= * *= / /= && || ?? & | ^ ~ ? :"
    },
    {
        "name": "left_paren",
        "pattern": /^\(/i,
        "match": "$0"
    },
    {
        "name": "right_paren",
        "pattern": /^\)/i,
        "match": "$0"
    },
    {
        "name": "left_square",
        "pattern": /^\[/i,
        "match": "$0"
    },
    {
        "name": "right_square",
        "pattern": /^\]/i,
        "match": "$0"
    },
    {
        "name": "left_curly",
        "pattern": /^\{/i,
        "match": "$0"
    },
    {
        "name": "right_curly",
        "pattern": /^\}/i,
        "match": "$0"
    }
    
]





let tokenized = tokenize(code, patterns)


console.log(tokenized)

