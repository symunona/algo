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


function countInversions(arr) {
    let test = mergeArrays([2], [1])
    console.log(test)

    let sorted = mergeSort(arr, 0, arr.length - 1, [])
    console.log(sorted)
}

function mergeSort(array, left, right, temp){
    if (left === right) {
        return { array: [array[left]], flips: 0}
    }
    let middle = Math.floor((left + right) / 2)
    let leftArray = mergeSort(array, left, middle, temp)
    let rightArray = mergeSort(array, middle + 1, right, temp)
    return mergeArrays(leftArray, rightArray)

}



function mergeArrays(a, b){
    let newArray = []
    let n = a.array.length + b.array.length
    let ai = 0, bi = 0
    for(let i = 0; i < n; i++){
        // Handle when we are at the end of the array
        if (ai >= a.array.length) {
            newArray = newArray.concat(b.array.slice(bi))
            break;
        } else if (bi >= b.array.length) {
            newArray = newArray.concat(a.array.slice(ai))
            break;
        }

        if (a.array[ai] < b.array[bi]) {
            newArray.push(a.array[ai])
            ai++
        } else{
            newArray.push(b.array[bi])
            bi++
        }
    }
    return { array: newArray, flips: 0 }
}


// O(n^2)
// Complete the countInversions function below.
// function countInversions(arr) {
//     let swaps = 0
//     console.log(arr, '---')
//     // Dest:
//     for(let i = 0; i < arr.length - 1; i++){
//         // We need to move it left for the last group that this
//         // is bigger than.
//         // Näive, actually moving the number
//         let j = i
//         while (arr[j] > arr[j + 1] && j >= 0){
//             // Move to right
//             swap(j, j + 1, arr)
//             swaps++
//             j--
//             console.log(arr)
//         }
//     }
//     return swaps
// }

// Not so Naive
// function countInversions(arr) {
//     let swaps = 0
//     let groupMap = {}
//     // Create a map that has all the number's indexes.
//     arr.map((el, i)=>{
//         groupMap[el] = groupMap[el] || []
//         groupMap[el].push(i)
//     })
//     let indexToPutNumber = 0
//     // Once we have all those, let's go over how many moves it takes
//     // to move them to their place, one after the other.
//     Object.keys(groupMap).sort((a,b)=>a-b).map((number)=>{
//         let swapsToMoveThisGroup = groupMap[number].reduce((prev, cur)=>{
//             // How many do we have to move it left?
//             if (cur > indexToPutNumber){
//                 return prev + (cur - indexToPutNumber++)
//             }
//             indexToPutNumber++
//             return prev
//         }, 0)
//         console.log('number', number, 'swaps needed', swapsToMoveThisGroup)
//         swaps += swapsToMoveThisGroup
//     })
//     console.log('swaps', swaps)
//     return swaps
// }

/*

2 1 3 1 2 - 5
1 2 3 1 2 - 4
1 2 2 1 3 - 3
1 1 2 2 3 - 2 => 3 !!!

2 1 3 1 2 - 5
2 1 2 1 3 - 4
1 1 2 2 3 - 3 => 2!!!
*/
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = countInversions(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
