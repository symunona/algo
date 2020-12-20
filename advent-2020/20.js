// 20.js

// 20t.in -> 20899048083289
// *1951    2311   *3079
//  2729    1427    2473
// *2971    1489   *1171

const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants')
const fs = require('fs')

const TRANSFORMATIONS = 8

let tiles = {}
let edges = {}
const SIZE = 10, N = 0, S = 1, E = 2, W = 3
fs.readFileSync('./20.in', 'utf8').split('\n\n').map((tile)=>{
    tile = tile.split('\n')
    let id = parseInt(tile[0].split(' ')[1])
    tiles[id] = []
    for(let x = 1; x < tile.length; x++){
        tiles[id].push(tile[x].split(''))
    }
    edges[id] = getEdges(tiles[id])
})

function getEdges(tile){
    let n = tile[0].join('')
    let s = tile[SIZE-1].join('')
    let e = tile.map((l)=>l[tile.length - 1]).join('')
    let w = tile.map((l)=>l[0]).join('')

    return [n, s, e, w]
}

function displayEdges(edge){
    let s = edge[N] + `\n`
    for(let y = 1; y < SIZE-1; y++){
        s+= edge[W].charAt(y) + (new Array(SIZE-1).join(' ')) + edge[E].charAt(y) + `\n`
    }
    s += edge[S].split('').join('')
    console.log(s)
}

function display(tile){
    tile.map((l)=>console.log(l.join('')))
}

let IMAGE_SIZE = Math.sqrt(Object.keys(tiles).length)
console.log(`size: ${IMAGE_SIZE} * ${IMAGE_SIZE}`)

// algo: this is a typical backtrack problem.

let arrangement = [], mat = [], transforms = []
for(let y = 0; y < IMAGE_SIZE; y++){
    arrangement[y] = new Array(IMAGE_SIZE)
    mat[y] = new Array(IMAGE_SIZE)
    transforms[y] = new Array(IMAGE_SIZE)
}

solve(0, 0, {})

renderImage()

function renderImage()
{
    let imageRawBlocks = []
    mat.map((line, y)=>{
        imageRawBlocks[y] = []
        image.push(
            line.map((id, x)=>{
                removeEdges(transformWholeTile(id, transforms[y][x]))
            }))
    })
    // Now we have imageRawBlocks filled up, just iterate over it, and concatenate all.

    fs.writeFileSync('./20.map', image)
}


function solve(x, y, used){
    if (x === IMAGE_SIZE){
        x = 0
        y++
        if (y === IMAGE_SIZE){
            console.log('WE WON!!!')
            let solution = [mat[0][0], mat[0][IMAGE_SIZE-1],
                mat[IMAGE_SIZE-1][0], mat[IMAGE_SIZE-1][IMAGE_SIZE-1]]
            console.log(solution)
            console.log(solution.reduce((p,c)=>p*c, 1))
            fs.writeFileSync('./20id.map', mat.map((line)=>line.join(' ')).join('\n'))
            fs.writeFileSync('./20tr.map', transforms.map((line)=>line.join(' ')).join('\n'))
            debugger
            return true
        }
    }
    for (let z in edges){
        if (used[z]) continue;
        for (let t = 0; t < TRANSFORMATIONS; t++){
            let tileEdges = transform(z, t)
            if (canPutThere(x, y, tileEdges)) {
                used[z] = true
                arrangement[y][x] = tileEdges
                transforms[y][x] = t
                mat[y][x] = z
                if (solve(x + 1, y, used)){
                    return true
                }
                used[z] = false
            }
        }
    }
}

function canPutThere(x, y, tileEdges){
    if (x === 0 && y === 0) return true
    if (x === 0){
        // Only have to check above, we are in the first column
        return tileEdges[N] === arrangement[y-1][x][S]
    }
    if (y === 0){
        // In the first row, only have to check if left side is matching
        return tileEdges[W] === arrangement[y][x-1][E]
    }
    // Left and Up
    return tileEdges[N] === arrangement[y-1][x][S] &&
           tileEdges[W] === arrangement[y][x-1][E]

}

function transform(tileId, t){
    switch(t){
        case 0: return edges[tileId]
        case 1:
        case 2:
        case 3:
            return rotate(edges[tileId], t)
        case 4:
            return flip(edges[tileId])
        case 5:
        case 6:
        case 7:
            return rotate(flip(edges[tileId]), t-4)
    }
}

function rotate(edges, a){
    edges = edges.slice()
    while (a-- > 0){
        newEdges = []
        newEdges[N] = edges[W].split('').reverse().join('')
        newEdges[E] = edges[N]
        newEdges[S] = edges[E].split('').reverse().join('')
        newEdges[W] = edges[S]
        edges = newEdges
    }
    return edges
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
            return rotateWholeTile(flipWholeTile(tile, t-4))
    }
}


function flip(edges){
    let n = edges[N]
    edges = edges.slice()
    edges[N] = edges[S]
    edges[S] = n
    edges[E] = edges[E].split('').reverse().join('')
    edges[W] = edges[W].split('').reverse().join('')
    return edges
}


function removeEdges(matrix){
    return matrix.slice(1, matrix.length - 2).map((line)=>line.slice(1, line.length -2))
}

