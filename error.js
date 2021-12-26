class Parser{
    constructor(tokens){
        this.tokens = tokens
        this.PRECEDENCE = {
            "=": 1,
            "||": 2,
            "&&": 3,
            "<": 7, ">": 7, "<=": 7, ">=": 7, "==": 7, "!=": 7,
            "+": 10, "-": 10,
            "*": 20, "/": 20, "%": 20,
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
        this.tokens.shift()
    }

    parseExpression() {
        console.log("this", this !== undefined)
        return this.maybe_call(this.maybe_binary(this.parseAtom(), 0))
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
        
        if(["int", "float", "string_single"].includes(type)){
            this.next_token()
            return {
                "type": "literal",
                "value": first
            }
        }
        
        if(type == "identifier"){
            this.skipNextType("identifier")
            return {
                "type": "identifier",
                "value": first
            }
        }
        if(type == "newline"){
            this.next_token()
            return this.parseAtom()
        }
        console.log(first)
        throw new Error("Didn't parse an atom")
    
    }
    
    skipNextType(type){
        if(this.tokens[0]?.type == type){
            return this.tokens.shift()
        }
        throw new Error("Invalid token to skip")
    }
    
    skipNextValue(value){
        if(this.tokens[0]?.value == value){
            return this.tokens.shift()
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
                    this.skipNextValue(separator_value)
                }else{
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
                this.skipNextType("operator")
                
                let atom = this.parseAtom()
                let right = this.maybe_binary(atom, other_precedence)
                let binary = {
                    "type": "binary_operation",
                    "operator": operator.value,
                    "left": left,
                    "right": right
                }
                return this.maybe_binary(binary, precedence)
            }
        }

        return left
    }
    
    maybe_call(expression){
        console.log("maybe_call", !!this)
        return this.isNextType("left_paren") ? this.parse_call(expression) : expression
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


let parser = new Parser([
    { type: 'int', value: '1234123'},
    { type: 'newline', value: '\r\n'},
    { type: 'int', value: '0'},
    { type: 'operator', value: '+'},
    { type: 'float', value: '1.01'},
    { type: 'newline', value: '\r\n'},
    { type: 'identifier', value: 'a'},
    { type: 'operator', value: '='},
    { type: 'int', value: '0'},
    { type: 'newline', value: '\r\n'},
    { type: 'identifier', value: 'b'},
    { type: 'operator', value: '='},
    { type: 'int', value: '1'},
    { type: 'newline', value: '\r\n'},
    { type: 'identifier', value: 'c'},
    { type: 'operator', value: '='},
    { type: 'int', value: '94'},
    { type: 'operator', value: '+'},
    { type: 'identifier', value: 'b'},
    { type: 'operator', value: '+'},
    { type: 'int', value: '0'},
    { type: 'newline', value: '\r\n'},
    { type: 'identifier', value: 'puts'},
    { type: 'left_paren', value: '('},
    { type: 'identifier', value: 'a'},
    { type: 'operator', value: '+'},
    { type: 'identifier', value: 'b'},
    { type: 'right_paren', value: ')'},
    { type: 'newline', value: '\r\n'},
    { type: 'identifier', value: 'puts'},
    { type: 'left_paren', value: '('},
    { type: 'identifier', value: 'c'},
    { type: 'right_paren', value: ')'},
    { type: 'newline', value: '\r\n'},
    { type: 'identifier', value: 'puts'},
    { type: 'left_paren', value: '('},
    { type: 'identifier', value: 'c'},
    { type: 'right_paren', value: ')'},
    { type: 'newline', value: '\r\n'},
    { type: 'newline', value: '\r\n'},
    { type: 'identifier', value: 'puts'},
    { type: 'left_paren', value: '('},
    {
      type: 'string_single',
      value: 'hello world!',
      line: 10,
      position: 5
    },
    { type: 'right_paren', value: ')'},
    { type: 'newline', value: '\r\n'},
    { type: 'identifier', value: 'puts'},
    { type: 'left_paren', value: '('},
    {
      type: 'string_single',
      value: "abc \\\\123\\'def",
      line: 11,
      position: 5
    },
    { type: 'right_paren', value: ')'}
  ])
console.log(parser.parseProgram())