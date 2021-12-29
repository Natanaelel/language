const tokenize = require("./tokenizer.js")
const Parser = require("./parser_class.js")
const patterns = require("./patterns.js")
const {add, subtract, multiply, divide} = require("./runtime/math.js")
const {equals} = require("./runtime/logic.js")
// const runCode = require("./run.js")


const NIL = {
    "type": "nil"
}
function interpret(program, settings){
    
    if(settings?.pretty_running_program_sign) console.log(`
+--------------------+
|  Running program!  |
+--------------------+
`)


    
    let global = {}
    

    global["raw"] = {
        "type": "js_function",
        "func": (...args) => console.log(args),
        "return_type": "nil"
    }

    global["puts"] = {
        "type": "js_function",
        "func": (...args) => console.log(args.map(to_string).join("\n")),
        "return_type": "nil"
    }
    global["p"] = {
        "type": "js_function",
        "func": (...args) => console.log(args.map(inspect).join("\n")),
        "return_type": "string"
    }
    global["eval"] = {
        "type": "js_function",
        "func": (arg) => {
            // let code = arg.value.toString()
            // let tokenized = tokenize(code, patterns)
            // let parsed = new Parser(tokenized, false).parseProgram().program
            // return evaluate(parsed, global)
            let runCode = require("./run.js")
            return runCode(arg.value.toString())
        },
        "return_type": "value"
        
    }
    global["js_eval"] = {
        "type": "js_function",
        "func": (arg, type) => {
            if(arg.type == "string" && type.type == "string") return {
                "type": type.value,
                "value": eval(arg.value)
            }
            throw new Error("eval type must me string")
        },
        "return_type": "value"
    }
    global["random"] = {
        "type": "js_function",
        "func": Math.random,
        "return_type": "float"
    }
    // evaluate(program.program, global, console.log)
    return evaluate(program.program, global, settings?.log_line ? console.log : (x=>x))
    
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
    if(type == "value"){
        return evaluate_expression(expression.value, scope)
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
        if(operator == "-") return subtract(left, right)
        if(operator == "*") return multiply(left, right)
        if(operator == "/") return divide(left, right)
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
        if(func.type == "function"){
            return call_func(func, args, scope)
        }else if(func.type == "js_function"){
            let args = expression.args.map(arg => evaluate_expression(arg, scope))
            // let func = scope[expression.func.value]
            return {
                "type": func.return_type,
                "value": func.func(...args)
            }
        }
        throw new Error("waht function is this?")
    }
    if(type == "js"){
        return evaluate_js(expression, scope)
    }
    if(type == "js_func"){
        let args = expression.args.map(arg => evaluate_expression(arg, scope))
        let func = scope[expression.func.value]
        return func(...args)
    }
    // console.log("type:", type)

    // return "null lol"
    return NIL
}

// function equals(left, right){
//     return {
//         "type": "bool",
//         "value": left.type == right.type && left.value == right.value // doesn't work with arrays and objects yet
//     }
// }
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
    if(type == "string") return `"${value}"`
    if(type == "value") return inspect(value)
    throw new Error(`can't inspect ${value} of type ${type}`)
}
function to_string(atom){
    let {type, value} = atom
    if(type == "int") return value.toString()
    if(type == "float") return value.toString()
    if(type == "bool") return value.toString()
    if(type == "nil") return ""
    if(type == "string_single") return `${value}`
    if(type == "string_double") return `${value}`
    if(type == "string") return `${value}`
    if(type == "value") return to_string(value)
    throw new Error(`can't convert ${value} of type ${type} to string`)
}

module.exports = interpret