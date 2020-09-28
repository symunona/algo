// Source: https://codingcompetitions.withgoogle.com/codejam/round/0000000000201bf2/0000000000201d1a


const fs = require('fs')

let content = fs.readFileSync(0, 'utf8');
let lines = content.split(/\r?\n/);
let cases = +lines[0];



let out = [];
for (let i = 1; i <= cases; i++) {
    var result = solve(lines[i]);
    out.push(`Case #${i}: ${result}`);
}

fs.writeFileSync(1, out.join('\n'));

function solve(string){
    string = string.split('')

    let result = [string[0]]
    for (let i = 1; i<string.length; i++) {
        if (result[0] <= string[i]){
            // Prepend
            result.unshift(string[i])
        } else {
            result.push(string[i])
        }
    }
    return result.join('')
}