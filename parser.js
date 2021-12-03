function parse(code, patterns){
    patterns = {
        "translation": {
            "int": "i",
            "identifier": "v",
            "operator": "o",
            "left_paren": "(",
            "right_paren": ")",
            "left_square": "[",
            "right_square": "]",
            "left_curly": "{",
            "right_curly": "}",
            "comma": ","
        },
        "grammar": [
            {
                "name": "binary operation",
                "pattern": /^([iv])(o)([iv])/,
                "match": `{
                    "name": "binary operation",
                    "left": $0,
                    "right": $2,
                    "operator": $1
                }`
            },
            {
                "name": "literal",
                "pattern": /^i/,
                "match": `{
                    "name": "literal",
                    "value": $0
                }`
            }
        ]
    }
    let filtered = code.filter(x=>x[0] != "whitespace")
    let translated = filtered.map(x=>patterns.translation[x[0]]).join``
    
    let foundMatch = true
    let parsed = []
    let i = 0

    while(foundMatch){
        foundMatch = false
        let match
        let grammar
        for(grammar of patterns.grammar){
            match = translated.match(grammar.pattern)
            if(match){
                let tokens = match[0].split("").map((char, index) => filtered[index +  i])

                parsed.push(JSON.parse(grammar.match.replace(/\$(\d+)/g, m => JSON.stringify(tokens[m[1]]))))
                i += match[0].length
                translated = translated.slice(match[0].length)
                foundMatch = true
                break
            }
        }
    }



    console.log(translated)
    console.log(parsed)
    return parsed

}

module.exports = parse