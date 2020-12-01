'use strict';

const fs = require('fs');
const { max } = require('underscore');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the maxSubsetSum function below.
function maxSubsetSum(arr) {

    if (arr.length === 0 ) return 0
    if (arr.length === 1 ) return arr[0]
    if (arr.length === 2 ) return Max.apply(this, arr[0], arr[1])
    // filter out all the - and the zeros from the equation: there
    // is no point ever putting a minus in there, ever.
    // Then for the rest, we need to see which ones can go next to each other.

    // Generate the sum map
    let prev = 0
    // let sumMap = arr.reverse().map((v)=> v > 0 ? prev+=v : v)
    // 1-, 3, 5

    let i = 3
    let maxes = [getAboveZeroPart(arr[0]), getAboveZeroPart(arr[1])]
    maxes[2] = getAboveZeroPart(arr[2]) + maxes[0]

    while(i < arr.length){
        maxes[i] = getAboveZeroPart(arr[i]) + Math.max(maxes[i-2], maxes[i-3])
        i++
    }

    // console.log(Math.max(maxes[maxes.length-1], maxes[maxes.length-2]))

    return Math.max(maxes[maxes.length-1], maxes[maxes.length-2])

    // Always pick one to two
}

function getAboveZeroPart(val){
    return val > 0 ? val : 0
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = maxSubsetSum(arr);

    ws.write(res + '\n');

    ws.end();
}
