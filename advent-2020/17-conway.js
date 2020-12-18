// 17 3d conway simulator
const fs = require('fs'), _ = require('underscore')

let matrix = []

matrix[0] = fs.readFileSync('./17.in','utf8').split('\n')
    .map((line)=>line.split('').map((tf)=>tf==='#'));

let limits = {
    miX: 0,
    miY: 0,
    miZ: 0,
    maX: matrix[0][0].length,
    maY: matrix[0].length,
    maZ: 0
}

let neighborM

for(let i = 0; i < 6; i++){
    console.log('----------------------- >', i)

    // for(let z = limits.miZ; z <= limits.maZ; z++){
    //     console.log (z, ' --')
    //     drawLayer(matrix, z)
    // }
    // Expand Limits. Whoa.
    Object.keys(limits).map((k)=>k.startsWith('mi')?limits[k]--:limits[k]++)

    let ret = getNewMatrix(matrix)
    matrix = ret.matrix
    neighborM = ret.counts
    // console.log ('   -------------')
    // for(let z = limits.miZ; z <= limits.maZ; z++){
    //     console.log (z, ' --')
    //     drawNeighborLayer(neighborM, z)
    // }

}


console.log('all active after 6 rounds: ', countActive(matrix))

// for(let z = limits.miZ; z <= limits.maZ; z++){
//     console.log (z, ' --')
//     drawLayer(matrix, z)
// }

console.log('The End')

function countActive(matrix){
    let count = 0
    for (let z = limits.miZ; z <= limits.maZ; z++){
        for (let y = limits.miY; y <= limits.maY; y++){
            for (let x = limits.miX; x <= limits.maX; x++){
                if (get(matrix, {x,y,z})){
                    count++
                }
            }
        }
    }
    return count
}



function getNewMatrix(matrix){
    let newMatrix = []
    let neighborM = []

    for (let z = limits.miZ; z <= limits.maZ; z++){
        newMatrix[z] = []
        neighborM[z] = []
        for (let y = limits.miY; y <= limits.maY; y++){
            newMatrix[z][y] = []
            neighborM[z][y] = []
            for (let x = limits.miX; x <= limits.maX; x++){
                let neighbors = countNeighbors(matrix, {x, y, z})
                if (get(matrix, {x, y, z})){
                    neighborM[z][y][x] = neighbors;
                    if (neighbors === 2 || neighbors === 3){
                        newMatrix[z][y][x] = true
                    } else {
                        newMatrix[z][y][x] = false
                    }
                } else {
                    if (neighbors === 3){
                        newMatrix[z][y][x] = true
                    } else {
                        newMatrix[z][y][x] = false
                    }
                }
            }
        }
    }

    return { matrix: newMatrix, counts: neighborM }
}


// Only counts to 4
function countNeighbors(matrix, pos){
    let neighborsActive = 0
    for (let z = -1; z <= 1; z++){
        for (let y = -1; y <= 1; y++){
            for (let x = -1; x <= 1; x++){
                if (x === 0 && y === 0 && z === 0){ continue }
                if (getNeighbor(matrix, pos, {x, y, z})){
                    neighborsActive++
                    if (neighborsActive > 3) return 4
                }
            }
        }
    }
    return neighborsActive;
}

function getNeighbor(matrix, pos, dir){
    let dircords = {x: pos.x + dir.x, y: pos.y + dir.y, z: pos.z + dir.z}
    return get(matrix, dircords)
}

// Bool
function get(matrix, pos){
    if (!matrix[pos.z]) return false
    if (!matrix[pos.z][pos.y]) return false
    if (!matrix[pos.z][pos.y]) return false
    if (!matrix[pos.z][pos.y][pos.x]) return false
    return true
}

function drawLayer(matrix, layer){
    for (let y = limits.miY; y < limits.maY; y++){
        let rowToPrint = ''
        for (let x = limits.miX; x < limits.maX; x++){
            rowToPrint += ((
                matrix[layer] &&
                matrix[layer][y] &&
                matrix[layer][y][x])?'█':'░')
        }
        console.log(rowToPrint)
    }
}
function drawNeighborLayer(matrix, layer){
    for (let y = limits.miY; y < limits.maY; y++){
        let rowToPrint = ''
        for (let x = limits.miX; x < limits.maX; x++){
            rowToPrint += ((
                matrix[layer] &&
                matrix[layer][y] &&
                matrix[layer][y][x])?matrix[layer][y][x]:'░')
        }
        console.log(rowToPrint)
    }
}



