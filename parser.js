module.exports = class Parser {
    constructor(tokens, logging = false){
        this.tokens = tokens
        this.logging = logging
        this.PRECEDENCE = {
            "=": 2,
            "||": 4,
            "?": 3,
            ":": 3,
            "&&": 5,
            "<": 10, ">": 10, "<=": 10, ">=": 10,
            "==": 9, "!=": 9,
            "+": 12, "-": 12,
            "*": 13, "/": 13, "%": 13,
        }
        this.NIL = {
            "type": "nil"
        }
    }
    parseProgram(){
        let parsed = []
        while(this.tokens.length > 0){
            let expression = this.parseExpression()
            
            parsed.push(expression)
        }
        
        return {"type": "program", "program": parsed}
    }
    next_token(){
        this.tokens[0] && this.tokens.shift()
    }

    parseExpression() {
        let expression = this.parseAtom()
        expression = this.maybe_call(expression)
        expression = this.maybe_binary(expression, 0)
        return expression
    }
    parseAtom(){
        if(this.tokens.length == 0) return this.NIL
        
        let first = this.tokens[0]
        let type = first.type
        
        if(type == "left_paren"){
            this.next_token()
            let expression = this.parseExpression()
            this.skipNextType("right_paren")
            return expression
        }
        
        if(["int", "float", "string_single", "string_double", "bool", "nil", "string"].includes(type)){
            this.next_token()
            return {
                "type": "literal",
                "value": first
            }
        }
        
        if(type == "identifier"){
            this.skipNextType("identifier")
            // return {
            //     "type": "identifier",
            //     "value": first
            // }
            return first
        }
        if(type == "newline"){
            this.next_token()
            return this.parseAtom()
        }
        if(this.logging) console.log("didn't parse:")
        if(this.logging) console.log(first)
        throw new Error("Didn't parse an atom")
    
    }
    
    skipNextType(type){
        if(this.tokens[0]?.type == type){
            // return this.tokens.shift()
            return this.tokens[0] && this.tokens.shift()
        }
        throw new Error("Invalid token to skip")
    }
    
    skipNextValue(value){
        if(this.tokens[0]?.value == value){
            // return this.tokens.shift()
            return this.tokens[0] && this.tokens.shift()
        }
        throw new Error("Invalid value to skip")
    }

    isNextType(type){
        return this.tokens[0]?.type == type
    }

    isNextValue(value){
        return this.tokens[0]?.value == value
    }
    
    delimited(start, end, { separator_type, separator_value}, parser_func){
        let parsed = []
        let first_iteration = true
        this.skipNextValue(start)
        
        while(this.tokens.length > 0){
            
            if(this.isNextValue(end)) break
            
            if(first_iteration){
                first_iteration = false
            }else{
                if(separator_value && this.isNextValue(separator_value)){
                    if(this.logging) console.log(`skipping next '${separator_value}'`)
                    this.skipNextValue(separator_value)
                }else{
                    if(this.logging) console.log(`skipping next '${separator_type}'`)
                    if(this.logging) console.log(separator_value)
                    skipNextType(separator_type)
                }
            }
            if(this.isNextValue(end)) break
    
            let expression = parser_func()
            parsed.push(expression)
        
        }
    
        this.skipNextValue(end)
        return parsed
    }
    
    maybe_binary(left, precedence){
        let is_operator = this.isNextType("operator")
        let operator = this.tokens[0]

        if(is_operator){
            let other_precedence = this.PRECEDENCE[operator.value]

            if(other_precedence > precedence){
                if(operator.value == "?"){
                    let condition = left
                    this.skipNextValue("?")
                    let truthy = this.parseExpression()
                    this.skipNextValue(":")
                    let falsy = this.parseExpression()
                    return {
                        "type": "ternary",
                        "condition": condition,
                        "truthy": truthy,
                        "falsy": falsy
                    }

                }
                if(operator.value == ":") return left

                this.skipNextType("operator")
                let atom = this.parseAtom()
                let right = this.maybe_call(this.maybe_binary(atom, other_precedence))
                let binary = {
                    "type": "binary_operation",
                    "operator": operator.value,
                    "left": left,
                    "right": right
                }
                if(operator.value == "=") binary.type = "assignment"
                return this.maybe_binary(binary, precedence)
            }
        }

        return left
    }
    
    maybe_call(expression){
        return this.isNextType("left_paren") ? this.parse_call(expression) : expression
    }
    
    parse_prog() {
        let prog = this.delimited("{", "}", {separator_type: "newline", separator_value: ";"}, this.parseExpression.bind(this))

        if (prog.length == 0) return {"type": "nil"};
        if (prog.length == 1) return prog[0];
        return {
            type: "prog",
            prog: prog
        }
    }
    
    parse_call(func) {
        let args = this.delimited("(", ")", {separator_value: ","}, this.parseExpression.bind(this))
        return {
            "type": "call",
            "func": func,
            "args": args,
        }
    }

}