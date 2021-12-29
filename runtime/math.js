const NIL = {
    "type": "nil"
}

function add(left, right){
    if(left.type == "int" && right.type == "int"){
        return {
            "type": "int",
            "value": (parseInt(left.value) + parseInt(right.value)).toString()
        }
    }
    if(left.type == "int" && right.type == "float"){
        return {
            "type": "float",
            "value": (parseInt(left.value) + parseFloat(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "int"){
        return {
            "type": "float",
            "value": (parseFloat(left.value) + parseInt(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "float"){
        return {
            "type": "float",
            "value": (parseFloat(left.value) + parseFloat(right.value)).toString()
        }
    }
    if(left.type.includes("string") && right.type.includes("string")){
        return {
            "type": "string",
            "value": left.value + right.value
        }
    }
    throw new Error(`can't add ${left.type} and ${right.type}`)
    return NIL
}
function subtract(left, right){
    if(left.type == "int" && right.type == "int"){
        return {
            "type": "int",
            "value": (parseInt(left.value) - parseInt(right.value)).toString()
        }
    }
    if(left.type == "int" && right.type == "float"){
        return {
            "type": "float",
            "value": (parseInt(left.value) - parseFloat(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "int"){
        return {
            "type": "float",
            "value": (parseFloat(left.value) - parseInt(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "float"){
        return {
            "type": "float",
            "value": (parseFloat(left.value) - parseFloat(right.value)).toString()
        }
    }
    if(left.type.includes("string") && right.type.includes("string")){
        return {
            "type": "string",
            "value": left.value + right.value
        }
    }
    throw new Error(`can't subtract ${right.type} from ${left.type}`)
    return NIL
}

function multiply(left, right){
    if(left.type == "int" && right.type == "int"){
        return {
            "type": "int",
            "value": (parseInt(left.value) * parseInt(right.value)).toString()
        }
    }
    if(left.type == "int" && right.type == "float"){
        return {
            "type": "float",
            "value": (parseInt(left.value) * parseFloat(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "int"){
        return {
            "type": "float",
            "value": (parseFloat(left.value) * parseInt(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "float"){
        return {
            "type": "float",
            "value": (parseFloat(left.value) * parseFloat(right.value)).toString()
        }
    }
    throw new Error(`can't multiply ${left.type} and ${right.type}`)
    return NIL
}

function divide(left, right){
    if(left.type == "int" && right.type == "int"){
        if(right.value == "0") throw new Error("MathError, can't divide by 0")
        return {
            "type": "int",
            "value": Math.trunc(parseInt(left.value) / parseInt(right.value)).toString()
        }
    }
    if(left.type == "int" && right.type == "float"){
        if(right.value == "0") throw new Error("MathError, can't divide by 0")
        return {
            "type": "float",
            "value": (parseInt(left.value) / parseFloat(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "int"){
        if(right.value == "0") throw new Error("MathError, can't divide by 0")
        return {
            "type": "float",
            "value": (parseFloat(left.value) / parseInt(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "float"){
        if(right.value == "0") throw new Error("MathError, can't divide by 0")
        return {
            "type": "float",
            "value": (parseFloat(left.value) / parseFloat(right.value)).toString()
        }
    }
    throw new Error(`can't divide ${left.type} and ${right.type}`)
    return NIL
}

function modulo(left, right){
    if(left.type == "int" && right.type == "int"){
        let left_val = parseInt(left.value)
        let right_val = parseInt(right.value)
        if(right.value == "0") throw new Error("MathError, can't modulo by 0")
        return {
            "type": "int",
            "value": ((left_val % right_val + right_val) % right_val).toString()
        }
    }
    if(left.type == "int" && right.type == "float"){
        let left_val = parseInt(left.value)
        let right_val = parseFloat(right.value)
        if(right.value == "0") throw new Error("MathError, can't modulo by 0")
        return {
            "type": "float",
            "value": ((left_val % right_val + right_val) % right_val).toString()
        }
    }
    if(left.type == "float" && right.type == "int"){
        let left_val = parseFloat(left.value)
        let right_val = parseInt(right.value)
        if(right.value == "0") throw new Error("MathError, can't modulo by 0")
        return {
            "type": "float",
            "value": ((left_val % right_val + right_val) % right_val).toString()
        }
    }
    if(left.type == "float" && right.type == "float"){
        let left_val = parseFloat(left.value)
        let right_val = parseFloat(right.value)
        if(right.value == "0") throw new Error("MathError, can't modulo by 0")
        return {
            "type": "float",
            "value": ((left_val % right_val + right_val) % right_val).toString()
        }
    }
    throw new Error(`can't modulo ${left.type} and ${right.type}`)
    return NIL
}

module.exports = {
    add, subtract, multiply, divide, modulo
}