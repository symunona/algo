const fs = require('fs'), _ = require('underscore')

let expressions = fs.readFileSync('./18.in', 'utf8').split('\n').map((line)=>{
    let exp = line.replace(/\s/g, '').split('')
    return parseLine(exp, 0)
})

function parseLine(line, start){
    let root = []
    let i = start
    while (i < line.length && line[i] !== ')'){
        let o = line[i]
        let current
        switch(o){
            case '(':
                current = parseLine(line, i+1)
                i = current.end
            break
            case '+':
            case '*':
                current = o
            break
            default: // number
                current = parseInt(o)
            break
        }
        root.push(current)
        i++
    }
    return { children: root, end: i }
}

function evale(expressions){
    let mode = '+'
    return expressions.children.reduce((p, c)=>{
        if (['*', '+'].indexOf(c) > -1){
            mode = c
            return p
        } else if (_.isObject(c)){
            return addOrMultiply(mode, p, evale(c))
        }
        return addOrMultiply(mode, p, c)
    }, 0)
}

function addOrMultiply(op, n1, n2){
    switch(op){
        case '+': return n1 + n2
        case '*': return n1 * n2
    }
}

console.log('expressions', expressions)
let res = expressions.map(evale)
console.log(res)
console.log(res.reduce((p, c)=>p + c, 0))
debugger;