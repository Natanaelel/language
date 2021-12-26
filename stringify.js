function stringify(tokens){
    return tokens.map(stringify_token).join("")

}
function stringify_token({name, value, line}){
    let string_value
    switch(name){
        case "int":
            string_value = value.toString()
            break
        case "float":
            string_value = value.toString()
            break
        case "operator":
            string_value = value.toString()
            break
        case "string_single":
            string_value = `'${value}'`
            break
        case "string_double":
            string_value = `"${value}"`
            break
        case "string_double_interpolate_start":
            string_value = `"${value}#{`
            break
        case "string_double_interpolate_middle":
            string_value = `}${value}#{`
            break
        case "string_double_interpolate_end":
            string_value = `}${value}"`
            break
        default:
            string_value = value.toString()
            break
    }

    return string_value
}


module.exports = stringify