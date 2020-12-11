const fs = require('fs'), _ = require('underscore')

let map = []
for(let x = 0; x < 128; x++){
    map[x] = []
    for(let y = 0; y < 8; y++){
        map[x][y] = '_'
    }
}

let coords = fs.readFileSync('./05.in', 'utf8')
    .split('\n').map((pos)=>{
        let binx = pos.substr(0, 7).replace(/B/g, '1').replace(/F/g, '0'),
            biny = pos.substr(-3).replace(/R/g, '1').replace(/L/g, '0'),
            x = binToInt(binx),
            y = binToInt(biny)
        map[x][y] = 'X'
        return {
            xb: pos.substr(0, 8),
            yb: pos.substr(-3),
            binx, biny,
            x, y, id: x*8 + y
        }
    })

function binToInt(bin){
    return bin.split('').reverse().reduce((prev, c, i)=>{
        // console.log(Math.pow(2, i), i, prev);
        return prev + ( c === '1' ? Math.pow(2, i) : 0); } , 0)
}


// console.log(coords)
console.log(_.max(_.pluck(coords, 'id')))

for(let x = 0; x < 128; x++){
    console.log(x, map[x].join(''))
}


