const tokenize = require("./tokenizer.js")
const parse = require("./parser.js")
const patterns = require("./patterns.js")



const NIL = {
    "type": "nil"
}
function interpret(program){
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
                "func": "let v = scope['arg1'].value;console.log((v instanceof String) ? v.replace(/\\./g, m=>({'\\\\n': '\\n', '\\\\\\\\': '\\\\'})[m]) : v)"
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
                "func": "console.log((scope['arg1'].value)"
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
                "func": "evaluate(parse(tokenize(scope['code'].value, patterns)), scope)"
            }
        ]
    }
    // evaluate(program.program, global, console.log)
    evaluate(program.program, global)
    
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
        return scope[expression.value.value]
    }

    if(type == "binary_operation"){
        let operator = expression.operator
        let left = evaluate_expression(expression.left, scope)
        let right = evaluate_expression(expression.right, scope)
        if(operator == "="){
            // console.log(`setting ${expression.left.value.value} to ${right.value}`)
            scope[expression.left.value.value] = right
            return right   
        }
        if(operator == "+") return add(left, right)
        if(operator == "*") return multiply(left, right)
    }
    
    if(type == "call"){
        let func = scope[expression.func.value.value]
        let args = expression.args.map(arg => evaluate_expression(arg, scope))
        return call_func(func, args, scope)
    }
    if(type == "js"){
        return evaluate_js(expression, scope)
    }
    // console.log("type:", type)

    return "null lol"
}
function add(left, right){
    // console.log("adding", left, "and", right)
    if(left.type == "int" && right.type == "int"){
        return {
            "type": "int",
            "value": parseInt(left.value) + parseInt(right.value)
        }
    }
    if(left.type.includes("string") && right.type.includes("string")){
        return {
            "type": "string",
            "value": left.value + right.value
        }
    }
    return {
        "type": "nil"
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

module.exports = interpret