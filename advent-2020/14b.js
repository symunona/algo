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

let memory = {}
let mask = ''

commands.map((cmd)=>{
    if (cmd.cmd === 'mask'){
        mask = cmd.mask
    } else {
        getMaskedValues(mask, pad(intToBin(cmd.mem), 36))
            .map(binToInt)
            .map((adr)=>memory[adr] = cmd.value)
    }
})

let sum = 0

Object.keys(memory).map((adr)=>sum += memory[adr])

console.log(sum)

function getMaskedValues(mask, value){
    var binVal = value.split('')
    var binMask = mask.split('')
    let maskedNewBinValue = binVal.map((b, i)=>{
        let maskBit = binMask[i]
        if (maskBit === 'X'){ return 'X' }
        else if (maskBit === '0'){ return b; }
        else return '1'
    }).join('')

    // 2^(number of X-es)
    let combinationCount = Math.pow(2, maskedNewBinValue.match(/X/g).length)
    // There are no X-es in this
    if (combinationCount === 1){ return [maskedNewBinValue] }

    let combinations = []
    let combinationsBinaryLength = intToBin(combinationCount).length - 1
    for(let i = 0; i<combinationCount; i++) {
        combinations.push(merge(i, maskedNewBinValue, combinationsBinaryLength))
    }
    return combinations
}

function merge(int, bin, intCharLength){

    let binIntToInsert = pad(intToBin(int), intCharLength).split('')
    let j = 0
    return bin.split('').map((b, i)=>{
        if (b === 'X'){ return binIntToInsert[j++] }
        return b;
    }).join('')
}

function intToBin(int){
    let bin = ''
    while (int > 0){
        bin = '' + (int % 2) + bin
        int = Math.floor(int / 2)
    }
    return bin
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



