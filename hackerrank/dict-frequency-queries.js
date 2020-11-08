// Source: https://www.hackerrank.com/challenges/frequency-queries/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dictionaries-hashmaps&h_r=next-challenge&h_v=zen

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

// Complete the freqQuery function below.
function freqQuery(queries) {
    let out = []
    let data = {}
    let lengthMap = {}

    queries.map((query)=>{
        let command = query[0]
        let value = query[1]
        switch(command){
            case 1: // insert
                let prevValueUp = data[value] = data[value] || 0
                data[value] ++
                updateLengthMap(prevValueUp, data[value], lengthMap)
                break;
            case 2: // delete
                let prevValueDown = data[value] = data[value] || 0
                if (data[value] > 0){
                    data[value] --
                    updateLengthMap(prevValueDown, data[value], lengthMap)
                } else {
                    lengthMap[0]++
                }

                break;
            case 3:
                out.push(lengthMap[value]?1:0)
        }
    })

    return out
}

function updateLengthMap(prevValue, currentValue, lengthMap){
    lengthMap[prevValue] = lengthMap[prevValue] || 0
    if (lengthMap[prevValue] > 0) { lengthMap[prevValue]-- }
    lengthMap[currentValue] = lengthMap[currentValue] || 0
    lengthMap[currentValue] ++
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
