// 22.js

const fs = require('fs')

let decks = []

fs.readFileSync('./22.in','utf-8').split('\n\n').map((players)=>{
    decks.push(players.split('\n').slice(1).map((n)=>parseInt(n)))
})

play(decks, 1)

function play(decks, game){

    let previousAlignments = {}
    let round = 1

    while (decks[0].length > 0 && decks[1].length > 0){

        let alignment = decks[0].join('_') + '+' + decks[1].join('_')

        // That's a weird rule.
        if (previousAlignments[alignment]){
            console.log(`XXXX game ${game} is won by 1`)
            // Tried 1, solution 33607 // not good
            return 0
        }
        previousAlignments[alignment] = true

        let tops = [decks[0].shift(), decks[1].shift()]

        let whoGetsIt
        if (decks[0].length >= tops[0] && decks[1].length >= tops[1]){
            // New Game
            let newDecks = decks.map((deck, i)=>deck.slice(0, tops[i]))
            whoGetsIt = play(newDecks, game+1)
        } else {
            whoGetsIt = tops.indexOf(Math.max.apply(this, tops))
        }

        decks[whoGetsIt].push(tops[whoGetsIt])
        decks[whoGetsIt].push(tops[whoGetsIt===0?1:0])

        // console.log(`round ${round} is won by ${whoGetsIt + 1}`)

        round++
    }

    let wins = decks[0].length > 0?0:1

    console.log(`game ${game} is won by ${wins + 1}`)
    let score = decks[wins].reverse().reduce((p, c, i)=>p + (c * (i+1)), 0)

    console.log(`winning score: ${score}`)
    return wins
}

// 30904 is not the right answer.




