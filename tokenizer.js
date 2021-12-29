function tokenize(code, patterns){
    code = code.replace(/\s+$/,"") // replace trailing whitespace
    
    let foundMatch = true
    let tokens = []
    let line = 1
    let position = 0
    while(foundMatch){
        foundMatch = false
        let match
        let token
        for(token of patterns){
            match = code.match(token.pattern)
            if(match){
                foundMatch = true
                let new_position
                let new_line
                code = code.replace(token.pattern, m => {
                    let lines = m.split("\n")
                    new_line = line + lines.length - 1
                    new_position = lines.length > 1 ? lines[lines.length - 1].length : position + m.length
                    return ""
                })
                tokens.push({
                    "type": token.type,
                    "value": token.match.replace(/\$(\d+)/g, m => match[m[1]]),
                    "line": line,
                    "position": position
                })
                position = new_position
                line = new_line
                break
            }
        }
    }
    if(code){
        console.warn("not everything parsed!")
    }
    tokens = remove_comments(tokens)
    tokens = remove_whitespace(tokens)
    tokens = clean(tokens)
    return tokens
}

function clean(tokens){
    return tokens.map(({type, value, line, position}) => {
        // if(type == "float") value = parseFloat(value)
        // if(type == "int") value = parseInt(value)
        // if(type == "bool") value = value == "true"
        if(type == "nil") return {type: "nil", line, position}
        if(type == "string_single" || type == "string_double") type = "string"
        return {type, value, line, position}
    })
}

function remove_whitespace(tokens) {
    return tokens.filter(({type}) => type != "whitespace")
}
function remove_comments(tokens) {
    return tokens.filter(({type}) => type != "comment")
}


module.exports = tokenize