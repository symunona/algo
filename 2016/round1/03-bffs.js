// Source: https://codingcompetitions.withgoogle.com/codejam/round/0000000000201bf2/0000000000201b6f

// Largest circle of kids with their bffs next to them.


const fs = require('fs')

let content = fs.readFileSync(0, 'utf8');
let lines = content.split(/\r?\n/);
let cases = +lines[0];

let out = [];
let lp = 1
for (let i = 1; i <= cases; i++) {
    let result = solve(+lines[lp++], lines[lp++].split(' '));
    out.push(`Case #${i}: ${result}`);
}

function solve(kidCount, friendConnections){
    
}