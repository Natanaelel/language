const NIL = {
    "type": "nil"
}

const add_string = (a, b) => a + b
const add_int_int = (a, b) => (parseInt(a) + parseInt(b)).toString()


function add(left, right){
    if(left.type == "string" && right.type == "string"){
        return {
            "type": "string",
            "value": add_string(left.value, right.value)
        }
    }
    return NIL
}


function multiply(left, right){
    if(left.type == "int" && right.type == "int"){
        return {
            "type": "string",
            "value": (parseInt(left.value) * parseInt(right.value)).toString()
        }
    }
    return NIL
}


module.exports = {
    add, multiply
}