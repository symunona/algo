'use strict';

const fs = require('fs');

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

// Complete the whatFlavors function below.
function whatFlavors(cost, money) {
    let priceMap = {}
    cost.map( (c, i) => priceMap[c] = i )
    let index = 0
    while (index < cost.length){
        let price = cost[index]
        if (priceMap[money - price]){
            return (index + 1) + ' ' + (priceMap[money - price] + 1)
        }
        index++
    }
    return false
}

function main() {
    const t = parseInt(readLine(), 10);
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    for (let tItr = 0; tItr < t; tItr++) {
        const money = parseInt(readLine(), 10);

        const n = parseInt(readLine(), 10);

        const cost = readLine().split(' ').map(costTemp => parseInt(costTemp, 10));


        ws.write(whatFlavors(cost, money) + "\n");
    }
    ws.end();

}
