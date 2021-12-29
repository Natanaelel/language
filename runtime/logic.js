const NIL = {
    "type": "nil"
}

function equals(left, right){
    return {
        "type": "bool",
        "value": left.type == right.type && left.value == right.value ? "true" : "false"
    }
}

module.exports = {
    equals
}