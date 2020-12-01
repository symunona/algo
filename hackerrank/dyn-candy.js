// dyn-candy Source: https://www.hackerrank.com/challenges/candies/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dynamic-programming

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

// Complete the candies function below.
function candies(n, arr) {

    let maxUp = 0
    let maxDown = 0
    let goingUp = 0
    let goingDown = 0
    let dir = []
    // find max diff
    for(let i = 0; i < arr.length - 1; i++){
        let grade = arr[i], nextGrade = arr[i+1]
        if (grade < nextGrade){
            goingUp++
            if (goingUp > maxUp){ maxUp = goingUp }
            goingDown = 0
            dir.push(1)
        }
        if (grade > nextGrade){
            goingDown++
            if (goingDown > maxDown){ maxDown = goingDown}
            goingUp = 0
            dir.push(-1)
        }
        if (grade === nextGrade){
            // Nothing here.
            dir.push(0)
        }
    }

    // let maxDiff = Math.max(maxUp, maxDown)

    // Find the streaks
    let streakEnds = []

    let diff = 0
    let start = 0

    let lastDir = 0
    // find first direction
    let i = 0
    while (dir[i] === 0 && i < dir.length){ i++ }
    lastDir = dir[i]

    // Everyone is equal, everyone gets a candy. What a class, with unique individuals
    if (i === dir.length){ return dir.length}

    for(let i = 0; i < dir.length; i++){
        switch(dir[i]){
            case 1:
                if (lastDir !== 1){
                    streakEnds.push({diff, start, end: i})
                    lastDir = 1
                    start = i
                    diff = 0
                }
                break;
            case -1:
                if (lastDir !== -1){
                    streakEnds.push({diff, start, end: i})
                    lastDir = -1
                    start = i
                    diff = 0
                };
                break;
            case 0:
                if (lastDir !== 0){
                    streakEnds.push({diff, start, end: i})
                    lastDir = 0
                    start = i
                    diff = 0
                }

        }
        diff += dir[i]
    }
    // last region is the end
    streakEnds.push({diff, start, end: dir.length})

    // console.log(streakEnds)

    let regions = streakEnds.sort((a, b)=>Math.abs(a.diff) - Math.abs(b.diff)).reverse()

    let solution = arr.map(()=>undefined)

    for(let i = 0; i < regions.length; i++){
        let region = regions[i];
        if (region.diff > 0){
            let candy = 1
            for(let j = region.start; j<=region.end; j++){
                // So the last one do not get overwritten.
                // console.log(j, solution.join(' '))
                if (!solution[j]){
                    solution[j] = candy
                }
                candy += dir[j]
            }
        } else if (region.diff < 0){
            let candy = 1
            for(let j = region.end; j>=region.start; j--){
                // console.log(j, solution.join(' '))
                if (!solution[j]){
                    solution[j] = candy
                }
                candy -= dir[j - 1]
            }
        } else {
            for(let j = region.start; j<=region.end; j++){
                if (!solution[j]){
                    solution[j] = 1
                }
            }
        }
    }

    let sum = solution.reduce((prev, cur)=>prev+cur, 0);

    // console.log(solution)
    // console.log(sum)

    return sum

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine(), 10);
        arr.push(arrItem);
    }

    const result = candies(n, arr);

    ws.write(result + '\n');

    ws.end();
}
