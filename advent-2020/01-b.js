const fs = require('fs')
console.log(__dirname)
const values = fs.readFileSync(__dirname + '/01.in', 'utf8')
    .split('\n').map((n)=>parseInt(n))
const year = 2020
let numberMap = {}
let i = 0
while(i < values.length){ numberMap[year - values[i]] = i++ }

let j = 0
let k = 0
loop1:
    while(k < values.length){
        while(j < values.length){
            if (numberMap[values[k] + values[j]] !== undefined){
                console.log(k, j, numberMap[values[k] + values[j]])
                debugger;
                break loop1;
            }
            j++
        }
        j = 0
        k++
    }
let res = [values[k], values[j], year - values[k] - values[j]]

console.log(res.join(' * '),  '=', res.reduce((prev, cur)=>prev*cur, 1))