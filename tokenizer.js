function tokenize(code, patterns){
    
    let foundMatch = true
    let tokens = []
    while(foundMatch){
        foundMatch = false
        let match
        let token
        for(token of patterns){
            match = code.match(token.pattern)
            if(match){
                foundMatch = true
                tokens.push([token.name, token.match.replace(/\$(\d+)/g, m => match[m[1]])])
                code = code.replace(token.pattern, "")
                break
            }
        }
    }
    if(code){
        console.log("not everything parsed!")
    }

    return tokens

}










module.exports = tokenize