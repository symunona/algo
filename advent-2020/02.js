const fs = require('fs')

let passwords = fs.readFileSync('./02.in', 'utf8')
    .split('\n').filter((line)=>{
        let rule = line.split(':')[0].split(' ')
        let minMax = rule[0].split('-').map((n)=>parseInt(n))
        let string =line.split(':')[1].trim().split('')
        let min = minMax[0]
        let max = minMax[1]
        let char = rule[1]
        let countChar = string.reduce((prev, c)=>prev+=(c===char)?1:0, 0)
        if (countChar >= min && countChar <= max){
            return true
        }
    })

console.log(passwords.length, passwords)

