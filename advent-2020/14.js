const fs = require('fs'), _ = require('underscore')

let commands = fs.readFileSync('./14.in','utf8').split('\n')
    .map((line)=>{
        let command = line.split(' = ')[0]
        if (command === 'mask'){
            return {
                cmd: 'mask',
                mask: line.split(' = ')[1]
            }
        } else {
            return {
                cmd: 'mem',
                mem: parseInt(line.split(' = ')[0].split('[')[1]),
                value: parseInt(line.split(' = ')[1])
            }
        }
    })

// 26867359880 is too low
let memory = {}
let mask = ''

commands.map((cmd)=>{
    if (cmd.cmd === 'mask'){
        mask = cmd.mask
    } else {
        memory[cmd.mem] = getMaskedValue(mask, cmd.value)
    }
})

let sum = 0

Object.keys(memory).map((adr)=>sum += binToInt(memory[adr]))

console.log(sum)

function getMaskedValue(mask, value){
    var binVal = intToBin36(value).split('')
    var binMask = mask.split('')
    return binVal.map((b, i)=>{
        let maskBit = binMask[i]
        if (maskBit === 'X'){ return b }
        else return maskBit;
    }).join('')
}

function intToBin36(int){
    let bin = ''
    while (int > 0){
        bin = '' + (int % 2) + bin
        int = Math.floor(int / 2)
    }
    return pad(bin, 36);
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

function binToInt(bin){
    return bin.split('').reverse().reduce((prev, c, i)=>{
        return prev + ( c === '1' ? Math.pow(2, i) : 0); } , 0)
}



