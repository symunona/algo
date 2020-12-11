const fs = require('fs')

let map = fs.readFileSync('./03.in', 'utf8')
    .split('\n')

let height = map.length
let repeating = map[0].length

const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 }
]

console.log(slopes.map(checkSlope))


function checkSlope(v){
    let pos = { x: 0, y: 0 }
    let trees =  0

    while(pos.y < height){
        if (map[pos.y][pos.x % repeating] === '#') trees++
        pos.x += v.x
        pos.y += v.y
    }
    return trees
}