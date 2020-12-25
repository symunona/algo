// let input0 = '974618352'.split('').map((n)=>parseInt(n))
let input = '389125467'.split('').map((n)=>parseInt(n))
let L = 9; Math.pow(10, 6) // input.length
// let M = Math.pow(10, 5) // input.length
let ROUNDS = Math.pow(10, 2)

// let input = new Array(L)
// for(let i = 0; i < L; i++) input[i] = i + 1;

// input0.map((x, i)=>input[i] = x)
// console.log('init done', input[0], input[10], input[11])

for(let i = 0; i < ROUNDS; i++){
    let selected = input[0]
    let pickUp = [input[1], input[2], input[3]]
    // input.splice(1, 3) // too expensive
    // move these3 to an index, so everything in between gets moved one by one to
    // the new place.
    // what comes to their place?

    let targetNumber = no(selected - 1)
    for(let j = 0; j < 10; j++){
        // if ()
    }
    while(input.indexOf(targetNumber) === -1){
        targetNumber = no(targetNumber - 1)
    }
    let targetI = input.indexOf(targetNumber)
    pickUp.map((r, j)=>
        input.splice(targetI + j + 1 , 0, r)
    )

    // Naah, too expensive
    // let e = input.shift()
    // input.push(e)
}
// print number after

let output = []
let start = input.indexOf(1)
for(let j = 0; j<2; j++) output.push(input[ni(start + j)])

console.log('the end: ' + output.join(' '))
// console.log(output)


function no(i){
    if (i < 1){
        return L + i
    }
    return i
}

function ni(i){
    if (i < 0){
        i = L + i
    }
    return i % L
}