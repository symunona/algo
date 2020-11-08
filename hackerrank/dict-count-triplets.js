// Source: https://www.hackerrank.com/challenges/count-triplets-1/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dictionaries-hashmaps

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countTriplets function below.
function countTriplets(arr, r) {

    let n = 0;
    let numberMap = {}
    let pairs = {}

    for (let i = arr.length-1; i >= 0; i--) {
        let num = arr[i]
        let power = num * r
        // Check for triplets first.
        if (pairs[power]){
            // console.log('found triplet: ', num, power, power * r, 'n', n, ' pow', pairs[power])
            n += pairs[power]
        }
        // When we had a pair, store it in our pair map, so when we reach a number, that has a pair,
        // we can calculate matching numbers!
        if (numberMap[power]){
            pairs[num] = pairs[num] || 0
            pairs[num] += numberMap[power]
            // console.log('found pair: ', num, power, 'this many: ', numberMap[power])
        }
        numberMap[num] = numberMap[num] || 0
        numberMap[num] ++
        // console.log('num: ', num, numberMap[num])
    }
    // console.log('n:', n)
    return n
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
