// Source: 2016 qualification 02: https://codingcompetitions.withgoogle.com/codejam/round/0000000000201bee/0000000000201d17

const fs = require('fs')

let content = fs.readFileSync(0, 'utf8');
let lines = content.split(/\r?\n/);
let cases = +lines[0];

let out = [];
for (let i = 1; i <= cases; i++) {
    var result = solve(lines[i].split(''));
    out.push(`Case #${i}: ${result}`);
}


fs.writeFileSync(1, out.join('\n'));

function solve(s){
    let flips = 0
    for(let i = 1; i < s.length; i++){
        if (s[i-1] !== s[i]){
            flips++
        }
    }

    if (s[s.length - 1 ] === '-'){
        flips ++
    }

    return flips
}
