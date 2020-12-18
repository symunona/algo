const { SSL_OP_CIPHER_SERVER_PREFERENCE } = require('constants')
const fs = require('fs'), _ = require('underscore')

let input = fs.readFileSync('./13t.in','utf8').split('\n')

let arrival = parseInt(input[0])
let allBuses = input[1].split(',')
let buses = allBuses.filter((b)=>b!=='x').map((b)=>{
    return {
        id: parseInt(b),
        m: allBuses.indexOf(b)
    }
})

console.log(JSON.stringify(buses))

// m * x1 + indexes(x1) = m * x2 + indexes(x2) = m * ...

let step = Math.max.apply(this, _.pluck(buses, 'id'))
let maxIndexInAllBuses = allBuses.map((b)=>parseInt(b)).indexOf(step)
let maxIndexInFixedBuses = _.pluck(buses, 'id').indexOf(step)
let maxRemainder = buses[maxIndexInFixedBuses].m

// buses.splice(maxIndex, 1)

buses = buses.map((b)=>{
    return {
        id: b.id,
        m: b.m-maxIndexInAllBuses
    }
})

let busMap = {}

buses.map((b)=>busMap[b.id] = b.m)
let secondBigest = Math.max.apply(this, _.pluck(buses, 'id'))
step = step * secondBigest;

console.log(JSON.stringify(buses), maxIndexInAllBuses, maxRemainder)

buses = buses.slice(maxIndexInFixedBuses, 1)


let t = 0

let start = lastStart = new Date()
let lastStep = 0

while (true){
    t += step
    let good = 0

    if ((t+'').length > lastStep){
        console.log(lastStep, new Date() - start, new Date() - lastStart)
        lastStart = new Date()
        lastStep = (t+'').length
    }

    for(let i = 0; i<buses.length; i++){
        if ((t + buses[i].m) % buses[i].id === 0){
            good++
        } else {
            continue
        }
    }
    if (good == buses.length) {
        console.log('win!')
        console.log(t - maxRemainder)
        console.log(buses.map((b)=>
            t - maxRemainder + b.m
        ))
        console.log(allBuses.map((b, i)=>
            t - maxRemainder + i
        ).join(', '))

        console.log(allBuses.map((b, i)=>{
            if (b === 'x') return 'x'
            return Math.floor(t / b) + ' * ' + b + ' + ' + busMap[parseInt(b)] + ' = '
            + (Math.floor(t / b) * b) + ' + ' +  busMap[parseInt(b)]
        }
        ).join(', '))
        break
    }

}