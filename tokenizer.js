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

    return clean(tokens)

}

function clean(tokens){
    return tokens.map(({type, value, line, position}) => {
        if(type == "float") value = parseFloat(value)
        if(type == "int") value = parseInt(value)
        if(type == "bool") value = value == "true"
        return {type, value, line, position}
    })
}



module.exports = tokenize