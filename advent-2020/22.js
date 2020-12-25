// 22.js

const fs = require('fs')

let decks = []

fs.readFileSync('./22.in','utf-8').split('\n\n').map((players)=>{
    decks.push(players.split('\n').slice(1).map((n)=>parseInt(n)))
})


while (decks[0].length > 0 && decks[1].length > 0){

    let tops = [decks[0].shift(), decks[1].shift()]

    let whoGetsIt = tops.indexOf(Math.max.apply(this, tops))

    decks[whoGetsIt].push(tops[whoGetsIt])
    decks[whoGetsIt].push(tops[whoGetsIt===0?1:0])
}

// score

let wins = decks[0].length > 0?0:1

let score = decks[wins].reverse().reduce((p, c, i)=>p + (c * (i+1)), 0)

console.log(wins + 1, score)




