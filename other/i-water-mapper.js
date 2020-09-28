// Source: interviewing.io youtube: https://www.youtube.com/watch?v=PFoKEpuSmaQ

/*

Given a 2D array where True represents water and False represents land
generate a pap with highest possible peak.

Rules are: the height of any water cell is 0, the height of any land
cell can not differ for more than one from any of the neighboring
(sharing one edge) cells.

*/


let width = 12, height = 8
let map = [
    'TTTTFFTTTTTT',
    'TTTFFFFFFTTT',
    'TTTFFFFFFTTT',
    'TTTFFFFTTTTT',
    'TTTFFFFTTTTT',
    'TTTTTTTTTTTT',
    'TTTTTTTTTTTT',
    'TTTTTTTTTTTT'
]

map = map.map((row)=>row.split(''))

// Initial map: 0 for the water
heightMap = map.map((row)=>row.map((col)=>col==='T'?0:-1))

// Now go from 0, and make all the -1s that are neigbouring the zero one more.
// Collect the edge

let edgePoints = getEdgePoints(heightMap)
let currentHeight = 0
while (edgePoints.length) {
    currentHeight++
    edgePoints.map((p)=>heightMap[p.y][p.x] = currentHeight)
    edgePoints = getEdgePoints(heightMap)
}

// Highest peak
console.log(currentHeight)
heightMap.map((row)=>console.log(row.join('')))

function getEdgePoints(map){
    // Find all the -1s that have a non -1 neighbor
    let edge = []
    for(let y=0; y < height; y++)
        for(let x=0; x < width; x++)
            if (map[y][x] === -1 && hasValidNeighbour(map, x, y))
                edge.push({x, y})

    return edge
}

function hasValidNeighbour(map, x, y){
    // Check 4 sides:
    let up, down, left, right
    if (x>0){ left = true }
    if (y>0){ up = true }
    if (x<width){ right = true }
    if (y<height){ down = true }
    if (up){ if (map[y-1][x]!== -1) return true }
    if (down){ if (map[y+1][x]!== -1) return true }
    if (left){ if (map[y][x-1]!== -1) return true }
    if (right){ if (map[y][x+1]!== -1) return true }
    return false
}
