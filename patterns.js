module.exports = [
    {
        "type": "keyword",
        "pattern": /^(if|else|for|while|break|next|redo|return|until|unless)/,
        "match": "$0"
    },
    {
        "type": "newline",
        "pattern": /^\r?\n/,
        "match": "$0"
    },
    {
        "type": "whitespace",
        "pattern": /^\s+/,
        "match": "$0"
    },
    {
        "type": "float",
        "pattern": /^((0|[1-9]\d*)\.\d+)/,
        "match": "$0"
    },
    {
        "type": "int",
        "pattern": /^(0|[1-9]\d*)/,
        "match": "$0"
    },
    {
        "type": "bool",
        "pattern": /^(true|false)/,
        "match": "$0"
    },
    {
        "type": "nil",
        "pattern": /^nil/,
        "match": "$0"
    },
    {
        "type": "identifier",
        "pattern": /^[a-z_]\w*/i,
        "match": "$0"
    },
    {
        "type": "string_single",
        "pattern": /^'((\\\\|\\'|[^\\'])*?)'/,
        "match": "$1"
    },
    {
        "type": "string_double_interpolate_start",
        "pattern": /^"((\\\\|\\"|[^\\"])*?)#\{/,
        "match": "$1"
    },
    {
        "type": "string_double_interpolate_middle",
        "pattern": /^}((\\\\|\\"|[^\\"])*?)#\{/,
        "match": "$1"
    },
    {
        "type": "string_double_interpolate_end",
        "pattern": /^}((\\\\|\\"|[^\\"])*?)"/,
        "match": "$1"
    },
    {
        "type": "string_double",
        "pattern": /^"((\\.|[^\\"])*?)"/,
        "match": "$1"
    },
    {
        "type": "operator",
        "pattern": /^(==|=>|=|>=|>|<=|<|!=|===|!==|\+=|\+|-=|-|\*=|\*|\/=|\/|%=|%|&&|\|\|\?\?|&|\||\^|~)/,
        "match":  "$1",
        "comment": "== => = >= > <= < != === !== += + -= - *= * /= / %= % && || ?? & | ^ ~"
    },
    {
        "type": "operator",
        "pattern": /^(\?|:)/,
        "match": "$1"
    },
    {
        "type": "left_paren",
        "pattern": /^\(/,
        "match": "$0"
    },
    {
        "type": "right_paren",
        "pattern": /^\)/,
        "match": "$0"
    },
    {
        "type": "left_square",
        "pattern": /^\[/,
        "match": "$0"
    },
    {
        "type": "right_square",
        "pattern": /^\]/,
        "match": "$0"
    },
    {
        "type": "left_curly",
        "pattern": /^\{/,
        "match": "$0"
    },
    {
        "type": "right_curly",
        "pattern": /^\}/,
        "match": "$0"
    },
    {
        "type": "comma",
        "pattern": /^,/,
        "match": "$0"
    },
    {
        "type": "range",
        "pattern": /^\.\.\.?/,
        "match":  "$0"
    },
    {
        "type": "comment",
        "pattern": /^#.*/,
        "match": "$0"
    }
    
]