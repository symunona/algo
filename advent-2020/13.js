const fs = require('fs')
let input = fs.readFileSync('./13.in','utf8').split('\n')

let arrival = parseInt(input[0])
let buses = input[1].split(',').filter((b)=>b!=='x').map((b)=>parseInt(b))
let indexes = buses.map((b)=>input[1].split(',').indexOf(b))

let nextLeaves = buses.map((bus)=>{
    return Math.ceil(arrival / bus) * bus
})

let nextBus = Math.min.apply(this, nextLeaves)
let busId = buses[nextLeaves.indexOf(nextBus)]
let wait = (nextBus - arrival);
console.log(arrival)
console.log(nextLeaves)
console.log(nextBus, busId, wait, busId * wait)

