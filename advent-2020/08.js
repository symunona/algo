const fs = require('fs'), _ = require('underscore');
const { runInContext } = require('vm');

let cmds = fs.readFileSync('./08.in', 'utf8')
    .split('\n').map((cmd)=>{
        return { cmd: cmd.split(' ')[0], val: parseInt(cmd.split(' ')[1]) }
    })



let toRun = cmds
let replacement = 0
let finalacc

console.log('starting running')
while((finalacc = run(toRun)) === undefined){
    console.log(replacement)
    toRun = cmds.slice()
    while(['jmp', 'nop'].indexOf(cmds[replacement].cmd) === -1){
        replacement++
    }
    let repCmd = cmds[replacement].cmd === 'jmp' ? 'nop' : 'jmp'
    toRun[replacement] = {cmd: repCmd, val: cmds[replacement].val, modified: cmds[replacement]}
    replacement++
}

run(toRun, replacement-1)
console.log(finalacc, replacement)
debugger

function run(cmds, dbg) {
    let ptr = 0, acc = 0, been = {}, accStack = [], stack = []
    while(1){
        if (ptr === cmds.length){
            if (dbg){
                console.log(stack)
                debugger;
            }
            return acc
        }
        if (been[ptr] !== undefined || ptr < 0 || ptr > cmds.length){
            return undefined;
        }
        accStack.push(acc)
        stack.push((dbg===ptr?'***': '') +  ptr + ' ' + cmds[ptr].cmd + ' ' + cmds[ptr].val + ' acc: ' + acc )
        been[ptr] = true
        switch(cmds[ptr].cmd){
            case 'acc':
                acc += cmds[ptr].val
                ptr++
            break
            case 'jmp':
                ptr += cmds[ptr].val
            break
            case 'nop':
                ptr++
            break
        }
    }

}
/// 895 is too low