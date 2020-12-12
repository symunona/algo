const fs = require('fs'), _ = require('underscore');

let seatMap = fs.readFileSync('./11.in', 'utf8')
    .split('\n').map((line)=>line.split(''))

let changes = apply(seatMap)

while (changes.changes > 0){
    // debug(changes.seatMap)
    console.log('changes', changes.changes)
    console.log('occupied', countOccupiedSeats(changes.seatMap))
    changes = apply(changes.seatMap)
}

function countOccupiedSeats(seatMap){
    return seatMap.reduce((prev, line)=>line.reduce((p, c)=>c === '#'?p+1:p, 0) + prev, 0)
}

function debug(map){
    console.log(map.map((line)=>line.join('')).join('\n'))
}


function apply (seatMap){
    let newSeatMap = []
    let changes = 0
    for(let y = 0; y < seatMap.length; y++){
        newSeatMap.push([])
        for(let x = 0; x < seatMap[y].length; x++){
            switch(seatMap[y][x]){
                case '.': newSeatMap[y].push('.'); break;
                // rule #1: empty, no occupied neighbours
                case 'L':
                if (getNeighborsOccupied(x, y, seatMap) === 0){
                    newSeatMap[y].push('#')
                    changes++
                } else {
                    newSeatMap[y].push('L')
                }
                break;
                // rule #2: more than 3 neighbors, then free.
                case '#':
                if (getNeighborsOccupied(x, y, seatMap)>=4){
                    newSeatMap[y].push('L')
                    changes++
                } else {
                    newSeatMap[y].push('#')
                }
            }
        }
    }
    return {seatMap: newSeatMap, changes}
}

function getNeighborsOccupied(x, y, seatMap){
    let left = true, right = true, up = true, down = true
    if (x === 0){ left = false }
    if (y === 0){ up = false }
    if (y === seatMap.length -1){ down = false }
    if (x === seatMap[y].length -1){ right = false }

    let toCheck = []
    if (left) toCheck.push(seatMap[y][x-1])
    if (right) toCheck.push(seatMap[y][x+1])
    if (up) toCheck.push(seatMap[y-1][x])
    if (down) toCheck.push(seatMap[y+1][x])
    if (left && up) toCheck.push(seatMap[y-1][x-1])
    if (right && up) toCheck.push(seatMap[y-1][x+1])
    if (left && down) toCheck.push(seatMap[y+1][x-1])
    if (right && down) toCheck.push(seatMap[y+1][x+1])
    return toCheck.reduce((p, n)=>n==='#'?p+1:p, 0)
}
