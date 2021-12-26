const PRECEDENCE = {
    "=": 1,
    "||": 2,
    "&&": 3,
    "<": 7, ">": 7, "<=": 7, ">=": 7, "==": 7, "!=": 7,
    "+": 10, "-": 10,
    "*": 20, "/": 20, "%": 20,
}
const NIL = {
    "type": "nil"
}
function parseProgram(tokens){
    let first = tokens[0]
    let second = tokens[0]

    let enumerated = tokens.map(x=>x)
    const next_token = () => {
        let token = enumerated.shift()
        return token.name == "whitespace" ? next_token() : token
    }

    let parsed = []
    while(tokens.length > 0){
        let [expression, rest_tokens] = parseExpression(tokens)
        
        console.log(["expression:", expression])

        parsed.push(expression)
        tokens = rest_tokens
    }
    
    return {"type": "program", "program": parsed}
}

function parseAtom(tokens){
    if(tokens.length == 0){
        return [NIL, []]
    }
    let first = tokens[0]
    let type = first.type
    if(type == "left_paren"){
        let [expression, rest_tokens] = parseExpression(tokens.slice(1))
        rest_tokens = skipNextType("right_paren", rest_tokens)
        return [expression, rest_tokens]
    }
    if(["int", "float", "string_single"].includes(type)){
        literal = {
            "type": "literal",
            "value": first
        }
        let rest_tokens = tokens.slice(1)
        return [literal, rest_tokens]
    }
    if(type == "identifier"){
        let rest_tokens = skipNextType("identifier", tokens)
        return [
            {
                "type": "identifier",
                "value": first
            },
            rest_tokens
        ]
    }
    if(type == "newline"){
        return parseAtom(tokens.slice(1))
    }
    console.log(first)
    throw new Error("Didn't parse an atom")

}

function parseExpression(tokens) {
     
        let [atom, rest_tokens] = parseAtom(tokens)
        console.log(["atom: ", atom])
        return maybe_call(maybe_binary(atom, 0, rest_tokens))
}

function maybe_binary(left, precedence, tokens){
    let is_operator = isNextType("operator", tokens)
    let operator = tokens[0]
    let rest_tokens = tokens
    console.log(operator)
    console.log("is operator? ", is_operator)
    if(is_operator){
        let other_precedence = PRECEDENCE[operator.value]
        console.log("other > this,", other_precedence, ">", precedence, ",", other_precedence > precedence)
        if(other_precedence > precedence){
            tokens = skipNextType("operator", tokens)
            
            let atom
            ;[atom, rest_tokens] = parseAtom(tokens)
            let right
            ;[right, rest_tokens] = maybe_binary(atom, other_precedence, rest_tokens)
            console.log("return operation")
            let binary = {
                "type": "binary_operation",
                "operator": operator.value,
                "left": left,
                "right": right
            }
            ;[binary, rest_tokens] = maybe_binary(binary, precedence, rest_tokens)
            return [binary, rest_tokens]
        }
    }
    console.log("not binary")
    console.log(tokens.slice(0,2))
    console.log(rest_tokens.slice(0,2))
    return [left, tokens]
}

function maybe_call([expression, rest_tokens]){
    console.log("maybe_call")
    console.log(expression)
    // console.log(rest_tokens)
    return isNextType("left_paren", rest_tokens) ? parse_call(expression, rest_tokens) : [expression, rest_tokens]
}
function parse_prog(tokens) {
    let [prog, rest_tokens] = delimited("{", "}", {separator_type: "newline", separator_value: ";"}, parseExpression, tokens);

    if (prog.length == 0) return {"type": "nil"};
    if (prog.length == 1) return prog[0];
    return [
        {
            type: "prog",
            prog: prog
        },
        rest_tokens
    ]
}
function parse_call(func, tokens) {
    let [args, rest_tokens] = delimited("(", ")", {separator_value: ","}, parseExpression, tokens)
    return [{
            "type": "call",
            "func": func,
            "args": args,
        },
        rest_tokens
    ]
}
function skipNextType(type, tokens){
    if(tokens[0]?.type == type){
        return tokens.slice(1)
    }
    throw new Error("Invalid token to skip")
}

function skipNextValue(value, tokens){
    if(tokens[0]?.value == value){
        return tokens.slice(1)
    }
    throw new Error("Invalid value to skip")
}

function isNextType(type, tokens){
    return tokens[0]?.type == type
}

function isNextValue(value, tokens){
    return tokens[0]?.value == value
}

function delimited(start, end, { separator_type, separator_value}, parser_func, tokens){
    let parsed = []
    let first_iteration = true
    console.log(tokens)
    tokens = skipNextValue(start, tokens)
    
    while(tokens.length > 0){
        
        if(isNextValue(end, tokens)) break
        
        if(first_iteration){
            first_iteration = false
        }else{
            if(separator_value && isNextValue(separator_value, tokens)){
                console.log(`skipping next '${separator_value}'`)
                tokens = skipNextValue(separator_value, tokens)
            }else{
                console.log(`skipping next '${separator_type}'`)
                console.log(separator_value)
                tokens = skipNextType(separator_type, tokens)
            }
        }
        if(isNextValue(end, tokens)) break

        let [expression, rest_tokens] = parser_func(tokens)
        tokens = rest_tokens
        parsed.push(expression)
    
    }

    tokens = skipNextValue(end, tokens)
    return [parsed, tokens]
}

module.exports = parseProgram