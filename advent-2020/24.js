// 24.js

const fs = require('fs')

// Coordinates are reduced to 2D: e, se

let flips = fs.readFileSync('./24.in', 'utf8').split('\n').map(splitLineToCommands)

function splitLineToCommands(line){
    let cmds = []
    let i = 0
    while(i < line.length){
        switch(line.charAt(i)){
            case 's':
                if (line.charAt(i+1) === 'e'){
                    cmds.push('se')
                } else {
                    cmds.push('sw')
                }
                i+=2
            break;
            case 'n':
                if (line.charAt(i+1) === 'e'){
                    cmds.push('ne')
                } else {
                    cmds.push('nw')
                }
                i+=2
            break;
            // e || w
            default: cmds.push(line.charAt(i++))
        }
    }
    return cmds
}

// reduce coordinates
let coords = flips.map((cmds)=>{
    let pos = {e: 0, se: 0}
    cmds.map((cmd)=>pos = getCommandPos(cmd, pos))
    return pos
})

console.log(JSON.stringify(coords));

function getCommandPos(cmd, refPos){
    let pos = refPos || {e: 0, se: 0}
    switch(cmd){
        case 'e': pos.e++
        break;
        case 'w': pos.e--
        break;
        case 'se':
            pos.se++
        break;
        case 'nw': pos.se--
        break;
        case 'ne':
            pos.e++
            pos.se--
        break;
        case 'sw':
            pos.se++
            pos.e--
        break;
    }
    return pos
}

let map = {}

const ROUNDS = 100
const DIRS = ['e', 'w', 'ne', 'nw', 'se', 'sw']

coords.map((pos)=>{
    map[pos.se] = map[pos.se] || {}
    map[pos.se][pos.e] = !map[pos.se][pos.e]
})

// count blacks
console.log('blacks', countAllBlacks(map))

draw(map)

for(let day = 1; day <= ROUNDS; day++ ){
    map = flipDay(map)
    draw(map)
    console.log(`Day ${day}: ${countAllBlacks(map)}`)
}



//   x x
//  x x x
//   x x

function draw(map){
    let minSe = 0, minE = 0, maxE = 0, maxSe = 0
    for (let se in map){
        se = parseInt(se)
        if (se < minSe) minSe = se;
        if (se > maxSe) maxSe = se;
        for (let e in map[se]){
            e = parseInt(e)
            if (e < minE) minE = e;
            if (e > maxE) maxE = e;
        }
    }
    let lineCounter = 0
    for(let se = minSe; se <= maxSe; se++){
        let line = new Array(1 + lineCounter++).join(' ');
        // if (lineCounter % 2 == 1) line+=' '

        for(let e = minE; e <= maxE; e++){
            let isBlack = isPosBlack(map, {e, se})
            if (se === 0 && e === 0){
                line += ' ' + (isBlack?'X':'0')
            } else{
                line += ' ' + (isBlack===undefined?'-':(isBlack?'⬢':'⬡'))
            }
        }
        console.log(line)
    }
}

function countAllBlacks(map){
    let blacks = 0
    for (let se in map){
        for (let e in map[se]){
            blacks = map[se][e]?blacks+1:blacks
        }
    }
    return blacks
}

function flipDay(map){
    let newMap = {}
    // Fill map, so we know what to check!
    for (let se in map){
        for (let e in map[se]){
            setNeighborKeys(newMap, map, {e, se})
        }
    }

    // draw(newMap)

    // Now do the flop.
    for (let se in newMap){
        for (let e in newMap[se]){
            let pos = {se, e}
            let blackNeighbors = getNeighbors(map, pos)
            
            if (se == -2 && e == 1) debugger
            if (isPosBlack(map, pos)){
                if (blackNeighbors === 0 || blackNeighbors > 2){
                    newMap[se][e] = false
                }
            } else{
                if (blackNeighbors === 2){
                    newMap[se][e] = true
                }
            }
        }
    }
    return newMap
}

function isPosBlack(map, pos){
    if (!map[pos.se]) return;
    return map[pos.se][pos.e]
}




function setNeighborKeys(newMap, map, pos){
    let n = 0
    newMap[pos.se] = newMap[pos.se] || {}
    newMap[pos.se][pos.e] = isPosBlack(map, pos)

    let poses = []
    while(n < DIRS.length){
        let neighborPos = getCommandPos(DIRS[n++])
        neighborPos.se += +pos.se;
        neighborPos.e += +pos.e;
        poses.push(neighborPos)
        newMap[neighborPos.se] = newMap[neighborPos.se] || {}
        newMap[neighborPos.se][neighborPos.e] = false
    }
    // if (pos.se == 0 && pos.e == 0) debugger;

}

function getNeighbors(map, pos){
    let blackNeighbors = 0
    let n = 0
    while(n < DIRS.length){
        let neighborPos = getCommandPos(DIRS[n++])
        neighborPos.e += +pos.e
        neighborPos.se += +pos.se
        if (isPosBlack(map, neighborPos)){
            blackNeighbors++
        }
    }
    return blackNeighbors
}