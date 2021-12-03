const fs = require("fs")


const tokenize = require("./tokenizer.js")
const parse = require("./parser.js")


let code = fs.readFileSync("./code.txt").toString()


console.log(code.toString())



const patterns = [
    {
        "name": "whitespace",
        "pattern": /^\s+/,
        "match": "$0"
    },
    {
        "name": "float",
        "pattern": /^((0|[1-9]\d*)\.\d+)/,
        "match": "$0"
    },
    {
        "name": "int",
        "pattern": /^(0|[1-9]\d*)/,
        "match": "$0"
    },
    {
        "name": "bool",
        "pattern": /^(true|false)/,
        "match": "$0"
    },
    {
        "name": "identifier",
        "pattern": /^[a-z_]\w*/i,
        "match": "$0"
    },
    {
        "name": "string_single",
        "pattern": /^'((\\\\|\\'|[^\\'])*?)'/,
        "match": "$1"
    },
    {
        "name": "operator",
        "pattern": /^(=|==|>|>=|<|<=|!=|===|!==|\+|\+=|-|-=|\*|\*=|\/|\/=|&&|\|\|\?\?|&|\||\^|~|\?|:)/,
        "match":  "$1",
        "comment": "= == > >= < <= != === !== + += - -= * *= / /= && || ?? & | ^ ~ ? :"
    },
    {
        "name": "left_paren",
        "pattern": /^\(/,
        "match": "$0"
    },
    {
        "name": "right_paren",
        "pattern": /^\)/,
        "match": "$0"
    },
    {
        "name": "left_square",
        "pattern": /^\[/,
        "match": "$0"
    },
    {
        "name": "right_square",
        "pattern": /^\]/,
        "match": "$0"
    },
    {
        "name": "left_curly",
        "pattern": /^\{/,
        "match": "$0"
    },
    {
        "name": "right_curly",
        "pattern": /^\}/,
        "match": "$0"
    },
    {
        "name": "comma",
        "pattern": /^,/,
        "match": "$0"
    },
    {
        "name": "range",
        "pattern": /^\.\.\.?/,
        "match":  "$0"
    }
    
]





let tokenized = tokenize(code, patterns)


console.log(tokenized)

// let parsed = parse(tokenized)

// console.log(parsed)

console.log(tokenized.map(x=>x[1]).join(""))