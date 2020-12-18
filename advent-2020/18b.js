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
    if (_.isNumber(expressions)) return expressions
    if (expressions.children.length === 1) return evale(expressions.children[0]);

    // find groups of +
    let groupsOfAddition = [[evale(expressions.children[0])]]
    let groupI = 0
    let i = 1
    while (i < expressions.children.length){
        let nextValue = evale(expressions.children[i+1])

        if (expressions.children[i] === '+'){
            groupsOfAddition[groupI].push(nextValue)
        } else {
            groupsOfAddition.push([nextValue])
            groupI++
        }
        i+=2
    }
    return groupsOfAddition.reduce((p, c)=>{
        return p * c.reduce((pa, ca)=>pa+ca,0)
    }, 1)
}

console.log('expressions', expressions)
let res = expressions.map(evale)
console.log(res)
console.log(res.reduce((p, c)=>p + c, 0))
debugger;