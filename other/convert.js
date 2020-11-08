let bin = '1101010101001001111'

let hex = 'cac01f2'

let dec = 1

console.log(dec)
console.log(intToBin(dec))
console.log(binToInt(intToBin(dec)))

console.log('----------------------')

console.log(bin)
console.log(binToInt(bin))
console.log(intToBin(binToInt(bin)))

console.log('----------------------')

for (let i = 0; i < 100; i++){
    console.log(i, intToBin(i), binToInt(intToBin(i)))
}

function intToBin(int){
    let bin = ''
    while (int > 0){
        bin = '' + (int % 2) + bin
        int = Math.floor(int / 2)
    }
    return bin
}

function binToInt(bin){
    return bin.split('').reverse().reduce((prev, c, i)=>{
        // console.log(Math.pow(2, i), i, prev);
        return prev + ( c === '1' ? Math.pow(2, i) : 0); } , 0)
}


