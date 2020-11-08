// Alphabet Cake - life is hard
// Source: 2017 round 01a: https://codingcompetitions.withgoogle.com/codejam/round/0000000000201843/0000000000201875

const fs = require('fs')

let content = fs.readFileSync(0, 'utf8');
let lines = content.split(/\r?\n/);
let cases = +lines[0];

let pointer = 1
for (let i = 1; i <= cases; i++) {
    let y = parseInt(lines[pointer].split(' ')[0]), x = parseInt(lines[pointer].split(' ')[1])
    pointer++
    let letterMap = []
    for(let j = 0; j < y; j++){
        letterMap[j] = lines[pointer++].split('')
    }
    let result = solve(x, y, letterMap);
    console.log(`Case #${i}:\n${result}`);
}

function solve(x, y, letterMap) {
    // Find big rects
    let letterMapMap = {}
    letterMap.map((line, l)=>line.map((char, i)=>{
        if (char !== '?') {
            letterMapMap[char] = letterMapMap[char] || []
            letterMapMap[char].push({ y: l, x: i })
        }
    }))
    // Letters that can not be used anymore
    let alreadyDone = []

    let sizeMap = {}
    Object.keys(letterMapMap).map((letter)=>{
        let xMin = Math.min(...letterMapMap[letter].map((c)=>c.x))
        let xMax = Math.max(...letterMapMap[letter].map((c)=>c.x))
        let yMin = Math.min(...letterMapMap[letter].map((c)=>c.y))
        let yMax = Math.max(...letterMapMap[letter].map((c)=>c.y))
        sizeMap[letter] = (xMax - xMin + 1) * (yMax - yMin + 1)
    });

    // Fill in all the rects!
    Object.keys(sizeMap)
        .sort((a, b)=>sizeMap[b]-sizeMap[a]) // descending
        .map((letter)=>{
            if (letterMapMap[letter].length > 1){
                let xMin = Math.min(...letterMapMap[letter].map((c)=>c.x))
                let xMax = Math.max(...letterMapMap[letter].map((c)=>c.x))
                let yMin = Math.min(...letterMapMap[letter].map((c)=>c.y))
                let yMax = Math.max(...letterMapMap[letter].map((c)=>c.y))
                drawLetterRect(xMin, yMin, xMax, yMax, letter, letterMap)
                extendRect(xMin, yMin, xMax, yMax, letter, letterMap)
            }
            else {
                extendRect(letterMapMap[letter][0].x, letterMapMap[letter][0].y,
                    letterMapMap[letter][0].x, letterMapMap[letter][0].y, letter, letterMap)
            }
        })

    return letterMap.map((line)=>line.join('')).join('\n')
}

function drawLetterRect(x1, y1, x2, y2, char, letterMap){
    for(let y = y1; y <= y2; y++)
        for(let x = x1; x <= x2; x++){
            letterMap[y][x] = char
        }
}

function extendRect(x1, y1, x2, y2, char, letterMap){
    // Go with X first
    while(canGoX(x2, 1, y1, y2, letterMap)){
        x2++
        drawLetterRect(x2, y1, x2, y2, char, letterMap)
    }
    while(canGoX(x1, -1, y1, y2, letterMap)){
        x1--
        drawLetterRect(x1, y1, x1, y2, char, letterMap)
    }
    while(canGoY(y2, 1, x1, x2, letterMap)){
        y2++
        drawLetterRect(x1, y2, x2, y2, char, letterMap)
    }
    while(canGoY(y1, -1, x1, x2, letterMap)){
        y1--
        drawLetterRect(x1, y1, x2, y1, char, letterMap)
    }
}

function canGoX(x, dir, y1, y2, letterMap){
    if (((x + dir) < 0) || ((x + dir) > letterMap[0].length)) return false;

    for(let y = y1; y <= y2; y++){
        if (letterMap[y][x + dir] !== '?') return false
    }
    return true
}
function canGoY(y, dir, x1, x2, letterMap){
    if (((y + dir) < 0) || ((y + dir) >= letterMap.length)) return false;

    for(let x = x1; x <= x2; x++){
        if (letterMap[y + dir][x] !== '?') return false
    }
    return true
}