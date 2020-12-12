const fs = require('fs'), _ = require('underscore');

const directions = [
    //    x   y
        [-1, -1],
        [ 0, -1],
        [ 1, -1],
        [-1,  0],
        [ 1,  0],
        [-1,  1],
        [ 0,  1],
        [ 1,  1]
    ]


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
                if (getNeighborsOccupied(x, y, seatMap)>=5){
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
    let occupied = 0

    directions.map((dir)=>{
        let xi = x + dir[0], yi = y + dir[1]
        while (xi >= 0 && xi < seatMap[0].length && yi >= 0 && yi < seatMap.length){
            if (seatMap[yi][xi] === '#'){
                occupied++
                break
            }
            if (seatMap[yi][xi] === 'L'){
                break
            }
            // else seatmap is .
            xi+=dir[0]
            yi+=dir[1]
        }
    })
    return occupied
}
