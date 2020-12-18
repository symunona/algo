// Soure: https://www.hackerrank.com/challenges/new-year-chaos/problem

'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumBribes function below.
function minimumBribes(q) {

    let shifted = 0
    let bribes = 0
    for(let i = 0; i < q.length; i++) {
        let diff = q[i] - i
        if (diff > 2) return 'Too chaotic'
        if (diff === 2) {
            bribes += 2
            shifted = 1
        }
        if (diff === 1) {
            if (remainder === 1){
                bribes
            }
        }
    }

}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
