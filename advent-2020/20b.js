const fs = require('fs')
const SIZE = 10, N = 0, S = 1, E = 2, W = 3

let tiles = {}

fs.readFileSync('./20.in', 'utf8').split('\n\n').map((tile)=>{
    tile = tile.split('\n')
    let id = parseInt(tile[0].split(' ')[1])
    tiles[id] = []
    for(let x = 1; x < tile.length; x++){
        tiles[id].push(tile[x].split(''))
    }
})


let idMap = fs.readFileSync('./20id.map', 'utf8').split('\n').map((line)=>{
    return line.split(' ').map((n)=>parseInt(n))
})
let trMap = fs.readFileSync('./20tr.map', 'utf8').split('\n').map((line)=>{
    return line.split(' ').map((n)=>parseInt(n))
})

let IMAGE_SIZE = idMap.length

renderImage()

function renderImage()
{
    let imageRawBlocks = []
    for (let y = 0; y < IMAGE_SIZE; y++){
        imageRawBlocks[y] = []
        for (let x = 0; x < IMAGE_SIZE; x++){
            imageRawBlocks[y][x] = removeEdges(transformWholeTile(tiles[idMap[y][x]], trMap[y][x]))
        }
    }

    // Now we have imageRawBlocks filled up, just iterate over it, and concatenate all.

    let rawImage = []
    for (let y = 0; y < IMAGE_SIZE; y++){
        for (let yi = 0; yi < SIZE-2; yi++){
            line = ''
            for (let x = 0; x < IMAGE_SIZE; x++){
                line += imageRawBlocks[y][x][yi].join('')
            }
            rawImage.push(line)
        }
    }
    fs.writeFileSync('./20.map', rawImage.join('\n'))
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
    return tile.reverse()
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

function removeEdges(matrix){
    return matrix.slice(1, matrix.length - 1).map((line)=>line.slice(1, line.length -1))
}

