const fs = require('fs')

let commands = fs.readFileSync('./12.in','utf8').split('\n')
    .map((l)=>{return {cmd: l.substr(0,1), d: parseInt(l.substr(1))}})

const DIRS = ['N', 'E', 'S', 'W']

let currentDir = 'E'
let pos = {x: 0, y: 0}


commands.map((c)=>{
    switch(c.cmd){
        case 'N':
        case 'S':
        case 'E':
        case 'W':
            forwardAbsolute(c.cmd, c.d)
        break
        case 'L':
            let turnLeft = c.d / 90
            for (let i = 0; i<turnLeft; i++){
                let dir = DIRS.indexOf(currentDir)
                if (dir === 0) dir = DIRS.length - 1
                else dir = dir - 1
                currentDir = DIRS[dir];
            }
        break
        case 'R':
            let turnRight = c.d / 90
            for (let i = 0; i<turnRight; i++){
                let dir = DIRS.indexOf(currentDir)
                if (dir === DIRS.length - 1) dir = 0
                else dir = dir + 1
                currentDir = DIRS[dir];
            }
        break
        case 'F':
            forwardAbsolute(currentDir, c.d)
        break
    }
    console.log(c, pos, currentDir)
})


function forwardAbsolute(dir, value){
    switch(dir){
        case 'N': pos.y+= value
        break
        case 'S': pos.y-= value
        break
        case 'E': pos.x+= value
        break
        case 'W': pos.x-= value
        break
    }
}


console.log('pos', pos, 'dist', Math.abs(pos.x) + Math.abs(pos.y))
// console.log(commands);