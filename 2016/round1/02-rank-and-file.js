// Source: https://codingcompetitions.withgoogle.com/codejam/round/0000000000201bf2/0000000000201d1a

// Find the missing line of a matrix if you have it's columns and rows


const fs = require('fs')

let content = fs.readFileSync(0, 'utf8');
let lines = content.split(/\r?\n/);
let cases = +lines[0];

let out = [];
let lp = 1
for (let i = 1; i <= cases; i++) {
    let task = {
        n: +lines[lp++],
        rows: []
    }
    for(let j = 0; j < 2*task.n - 1; j++){
        task.rows.push(lines[lp++].split(' '))
    }
    let result = solve(task);
    out.push(`Case #${i}: ${result}`);
}

fs.writeFileSync(1, out.join('\n'));

function solve(task){
    let numberMap = {}
    task.rows.map((row)=>row.map((number)=>{
        numberMap[number] = numberMap[number] || 0
        numberMap[number] ++
    }))

    // find even numbered numbers
    let evens = Object.keys(numberMap).filter((number)=>numberMap[number]%2!==0)
    return evens.join(' ')
}