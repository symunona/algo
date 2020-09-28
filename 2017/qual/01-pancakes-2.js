// Oversized pancake flipper
// Source: 2017 qualification 01: https://codingcompetitions.withgoogle.com/codejam/round/00000000002017f7/0000000000201847

const fs = require('fs')

let content = fs.readFileSync(0, 'utf8');
let lines = content.split(/\r?\n/);
let cases = +lines[0];

let out = [];
for (let i = 1; i <= cases; i++) {
    let line = lines[i].split(' ');
    let result = solve(line[0].split(''), parseInt(line[1]));
    out.push(`Case #${i}: ${result}`);
}


fs.writeFileSync(1, out.join('\n'));

function solve(pancakes, flipperSize){

    // Impossible, if incorrect ones are not dividable by the number of flipperSize:
    let flips = 0
    for(let i = 0; i <= pancakes.length - flipperSize; i++){
        if (pancakes[i] === '-'){
            // Do the flip!
            flip(pancakes, i, flipperSize)
            flips ++
        }
    }

    for(let i = pancakes.length - flipperSize; i < pancakes.length; i++){
        if (pancakes[i] === '-') return 'IMPOSSIBLE'
    }

    return flips

}

function flip(pancakes, indexFrom, n){
    for(let i = indexFrom; i < indexFrom + n; i++){
        pancakes[i] = pancakes[i]==='-'?'+':'-'
    }
}
