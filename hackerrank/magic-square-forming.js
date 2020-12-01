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



// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {
    let versions = generateVersions()
    let distances = versions.map((ver)=>distance(ver, s))
    return Math.min.apply(this, distances)
}

function generateVersions(){
    let root = '834 159 672'.split(' ').map((line)=>line.split('').map((v)=>parseInt(v)))
    let all = []
    // Rotations
    for(let i = 0; i < 4; i++){
        all.push(root)
        root = rot90(root)

        // Mirror horizontally and vertically
        all.push(mirrorV(root))
        all.push(mirrorH(root))
    }
    return all;
}

function distance(mat1, mat2){
    let dist = 0
    mat1.map((line, y)=>line.map((col, x)=>dist += Math.abs(col - mat2[y][x]) ))
    return dist;
}

function rot90(mat){
    return mat[0].map((column, i)=>mat.map((line)=>line[i]).reverse())
}

function mirrorV(mat){
    let ret = []
    mat.map((line)=>{
        let newLine = []
        line.map((n)=>newLine.unshift(n))
        ret.push(newLine)
    })
    return ret
}

function mirrorH(mat){
    let ret = []
    mat.map((line)=>ret.unshift(line.slice(0)))
    return ret
}





function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
