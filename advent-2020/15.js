const input = [0, 3, 6] // test should be 436
// const input = [0,13,1,8,6,15]   // my real one

const UNTIL = 10

let map = []

let nextNumberToTell, lastNumber
input.map((i, j)=>{
    console.log(i)
    nextNumberToTell = map[i] === undefined ? 0 : j - map[i]
    map[i] = j
})

let i;
for (i = input.length; i<UNTIL; i++){
    // console.log(i + 1, nextNumberToTell)
    // if (i % 1000000 === 0) 
    console.log(i + 1, nextNumberToTell)
    lastNumber = nextNumberToTell
    nextNumberToTell = map[nextNumberToTell] === undefined ? 0 : i - map[nextNumberToTell]
    map[lastNumber] = i
}
console.log(i, lastNumber)
