// 02.js
const fs = require('fs')
const signal = fs.readFileSync('./02.in', 'utf8')

console.log(parse(signal))

console.log(signal.split(';').map(parse))

debugger

function parse (signal){
    let letters = {}

    signal.toLowerCase().split('').reverse().map((c)=>{
        letters[c] = letters[c] || 0
        letters[c]++
    })

    console.log(letters)

    let inc = []
    Object.keys(letters).sort((a,b)=>letters[b] - letters[a]).map((c)=>inc.push(c))
    return inc.join('')
}

