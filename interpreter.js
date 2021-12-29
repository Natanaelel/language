const tokenize = require("./tokenizer.js")
const Parser = require("./parser_class.js")
const patterns = require("./patterns.js")



const NIL = {
    "type": "nil"
}
function interpret(program, settings){
    console.log()
    console.log("+--------------------+")
    console.log("|  Running program!  |")
    console.log("+--------------------+")
    console.log()
    let global = {}
    
    global["puts"] = {
        "type": "function",
        "args": [
            "arg1"
        ],
        "func": [
            {
                "type": "js",
                "old_func_do_not_use_hello_jello": "let v = scope['arg1'].value;console.log((v instanceof String) ? v.replace(/\\./g, m=>({'\\\\n': '\\n', '\\\\\\\\': '\\\\'})[m]) : v); scope['arg1']",
                "func": "let v = scope['arg1'];console.log(to_string(v)); v"
            }
        ]
    }
    global["p"] = {
        "type": "function",
        "args": [
            "arg1"
        ],
        "func": [
            {
                "type": "js",
                "func": "console.log(inspect(scope['arg1']));scope['arg1']"
            }
        ]
    }
    global["eval"] = {
        "type": "function",
        "args": [
            "code"
        ],
        "func": [
            {
                "type": "js",
                "func": `
let tokenized = tokenize(scope['code'].value, patterns)
let parsed = new Parser(tokenized, false).parseProgram()
// console.log(JSON.stringify(parsed, null, 2))
evaluate(parsed.program, global)
`
            }
        ]
    }
    global["js_eval"] = {
        "type": "function",
        "args": [
            "code"
        ],
        "func": [
            {
                "type": "js",
                "func": "({type:'any',value: eval(scope['code'].value)})"
            }
        ]
    }
    // evaluate(program.program, global, console.log)
    evaluate(program.program, global, settings?.log_line ? console.log : (x=>x))
    
    return "exit code=0"
}
function evaluate(program, scope, func=x=>x){
    let result = NIL;
    for(let expression of program){
        result = evaluate_expression(expression, scope)
        func(result)
    }
    return result
}

function evaluate_expression(expression, scope){
    let type = expression.type
    if(type == "literal"){
        return expression.value
    }
    if(type == "identifier"){
        // scoping error here, need recursive scope class
        // maybe fix idk
        let value = scope[expression.value]
        if(value) return value
        throw new Error(`variable ${expression.value} is not defined, line: ${expression?.line || "idk"}`)
    }

    if(type == "binary_operation"){
        let operator = expression.operator
        let left = evaluate_expression(expression.left, scope)
        let right = evaluate_expression(expression.right, scope)

        if(operator == "+") return add(left, right)
        if(operator == "*") return multiply(left, right)
        if(operator == "==") return equals(left, right)
    }
    if(type == "assignment"){
        let operator = expression.operator
        let var_name = expression.left.value
        let right = evaluate_expression(expression.right, scope)
        if(operator == "="){
            // console.log(`setting ${expression.left.value.value} to ${right.value}`)
            scope[var_name] = right
            return right   
        }
        throw new Error(`assignment operator ${operator} not yet implemented`)
    }
    
    if(type == "call"){
        let func = scope[expression.func.value]
        let args = expression.args.map(arg => evaluate_expression(arg, scope))
        return call_func(func, args, scope)
    }
    if(type == "js"){
        return evaluate_js(expression, scope)
    }
    // console.log("type:", type)

    // return "null lol"
    return NIL
}
function add(left, right){
    // console.log("adding", left, "and", right)
    if(left.type == "int" && right.type == "int"){
        return {
            "type": "int",
            "value": parseInt(left.value) + parseInt(right.value)
        }
    }
    if(left.type == "int" && right.type == "float"){
        return {
            "type": "float",
            "value": parseInt(left.value) + parseFloat(right.value)
        }
    }
    if(left.type == "float" && right.type == "int"){
        return {
            "type": "float",
            "value": parseFloat(left.value) + parseInt(right.value)
        }
    }
    if(left.type.includes("string") && right.type.includes("string")){
        return {
            "type": "string",
            "value": left.value + right.value
        }
    }
    console.error(`%ccan't add ${left.type} and ${right.type}`, "color:'#f00'")
    return NIL
}
function equals(left, right){
    return {
        "type": "bool",
        "value": left.value === right.value // doesn't work with arrays and objects yet
    }
}
function call_func(func, args, scope){

    let function_scope = {}
    
    func.args.map((arg_name, i) => {
        function_scope[arg_name] = args[i]
    })
    
    return evaluate(func.func, function_scope)
}
function evaluate_js(expression, scope){
    return eval(expression.func)
}

function inspect(atom){
    let {type, value} = atom
    if(type == "int") return value.toString()
    if(type == "float") return value.toString()
    if(type == "bool") return value.toString()
    if(type == "nil") return "nil"
    if(type == "string_single") return `'${value}'`
    if(type == "string_double") return `"${value}"`
}
function to_string(atom){
    let {type, value} = atom
    if(type == "int") return value.toString()
    if(type == "float") return value.toString()
    if(type == "bool") return value.toString()
    if(type == "nil") return ""
    if(type == "string_single") return `${value}`
    if(type == "string_double") return `${value}`
}

module.exports = interpret