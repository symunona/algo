const fs = require('fs')
const values = fs.readFileSync('./01.in', 'utf8')
    .split('\n').map((n)=>parseInt(n))
const year = 2020
let numberMap = {}
let i = 0
while(!numberMap[year - values[i]]){ numberMap[values[i++]] = true }
console.log(values[i],'*', year-values[i], '=', values[i] * (year - values[i]))