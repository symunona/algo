const fs = require('fs')

let commands = fs.readFileSync('./12.in','utf8').split('\n')
    .map((l)=>{return {cmd: l.substr(0,1), d: parseInt(l.substr(1))}})

const DIRS = ['N', 'E', 'S', 'W']

let currentDir = 'E'
let pos = {x: 0, y: 0}
let wayPoint = {x: 10, y: 1}


commands.map((c)=>{
    switch(c.cmd){
        case 'N':
        case 'S':
        case 'E':
        case 'W':
            moveWaypoint(wayPoint, c.cmd, c.d)
        break
        case 'L':
            let turnLeft = c.d / 90
            for (let i = 0; i<turnLeft; i++){
                rotateWaypoint(wayPoint, true)
            }
        break
        case 'R':
            let turnRight = c.d / 90
            for (let i = 0; i<turnRight; i++){
                rotateWaypoint(wayPoint, false)
            }
        break
        case 'F':
            forwardAbsoluteWaypoint(wayPoint, c.d)
        break
    }
    console.log(c, pos, currentDir, wayPoint)
})

function forwardAbsoluteWaypoint(wayPoint, d){
    pos.x += wayPoint.x * d
    pos.y += wayPoint.y * d
}


function moveWaypoint(wayPoint, dir, value){
    switch(dir){
        case 'N': wayPoint.y+= value
        break
        case 'S': wayPoint.y-= value
        break
        case 'E': wayPoint.x+= value
        break
        case 'W': wayPoint.x-= value
        break
    }
}

function rotateWaypoint(wayPoint, left){
    if (left){
        let tmp = wayPoint.y
        wayPoint.y = wayPoint.x
        wayPoint.x = -tmp;
    } else {
        let tmp = wayPoint.y
        wayPoint.y = -wayPoint.x
        wayPoint.x = tmp;
    }
    return wayPoint
}



console.log('pos', pos, 'dist', Math.abs(pos.x) + Math.abs(pos.y))
// console.log(commands);