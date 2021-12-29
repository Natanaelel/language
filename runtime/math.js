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
        return {
            "type": "int",
            "value": Math.trunc(parseInt(left.value) / parseInt(right.value)).toString()
        }
    }
    if(left.type == "int" && right.type == "float"){
        return {
            "type": "float",
            "value": (parseInt(left.value) / parseFloat(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "int"){
        return {
            "type": "float",
            "value": (parseFloat(left.value) / parseInt(right.value)).toString()
        }
    }
    if(left.type == "float" && right.type == "float"){
        return {
            "type": "float",
            "value": (parseFloat(left.value) / parseFloat(right.value)).toString()
        }
    }
    throw new Error(`can't divide ${left.type} and ${right.type}`)
    return NIL
}

module.exports = {
    add, subtract, multiply, divide
}