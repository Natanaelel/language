const NIL = {
    "type": "nil"
}

function equals(left, right){
    return {
        "type": "bool",
        "value": left.type == right.type && left.value == right.value ? "true" : "false"
    }
}
function not(atom) {
    return {
        "type": "bool",
        "value": truthy(atom) ? "true" : "false"
    }
}
function truthy(atom){
    if(atom.type == "bool" && atom.value == "false") return false
    if(atom.type == "nil") return false
    if(atom.type == "int" && atom.value == "0") return false
    if(atom.type == "float" && atom.value == "0") return false
    if(atom.type == "string" && atom.value == "") return false
    if(atom.type == "array" && atom.value == []) return false
    return true
}
function falsy(atom){
    return !truthy(atom)
}

module.exports = {
    equals, truthy, falsy, not
}