const fs = require('fs')

let patternToLookFor =
`                  # 
#    ##    ##    ###
 #  #  #  #  #  #`

let monsterY = patternToLookFor.split('\n').length
let monsterX = patternToLookFor.split('\n')[0].length

let vectorMatch = []

patternToLookFor.split('\n').map((line, y)=>line.split('').map((p, x)=>{
    if (p === '#'){
        vectorMatch.push({x, y})
    }
}))

console.log(vectorMatch)


for(let t = 0; t<8; t++){
    let map = fs.readFileSync('./20.map','utf8').split('\n').map((line)=>line.split(''))
    let newMap = transformWholeTile(map, t)
    // display(newMap)
    let positions = findMonsters(newMap)
    console.log(t, positions.length, positions)
    if (positions.length){
        placeMonsters(newMap, positions)
        console.log('roughness', countRoughness(newMap))
    }
}
debugger

function placeMonsters(map, positions){
    positions.map((m)=>{
        vectorMatch.map((p)=>{
            map[m.y + p.y][m.x + p.x] = 'O'
        })
    })
}

function countRoughness(map){
    return map.reduce((p, line)=>line.reduce((q, char)=>char==='#'?q+1:q, 0) + p, 0 )
}



// let map = fs.readFileSync('./20.map','utf8').split('\n').map((line)=>line.split('').map((p)=>p==='#'))
// let newMap = transformWholeTile(map, VERSION)
// let positions = findMonsters(newMap)
// console.log(2, positions.length, positions)
// debugger;


function display(tile){
    tile.map((l)=>console.log(l.join('')))
}


function findMonsters(map){
    let positions = []
    for (let y = 0; y < map.length - monsterY; y++){
        for (let x = 0; x < map.length - monsterX; x++){
            if (isMonster(x, y, map)){ positions.push({x, y})}
        }
    }
    return positions
}

function isMonster(x, y, map){
    let points = 0
    while(points < vectorMatch.length){
        if (map[y + vectorMatch[points].y][x + vectorMatch[points].x] !== '#') return false
        points++
    }
    return true
}


function rotateWholeTile(matrix, a){
    while (a-- > 0){
        matrix = matrix.map((row, i) =>
            row.map((val, j) => matrix[matrix.length - 1 - j][i])
        )
    }
    return matrix;
}

function flipWholeTile(tile){
    let newTile = []
    for (let y = tile.length - 1; y >=0; y--) newTile.push(tile[y])
    return newTile
}

function transformWholeTile(tile, t){
    switch(t){
        case 0: return tile
        case 1:
        case 2:
        case 3:
            return rotateWholeTile(tile, t)
        case 4:
            return flipWholeTile(tile)
        case 5:
        case 6:
        case 7:
            return rotateWholeTile(flipWholeTile(tile), t-4)
    }
}

