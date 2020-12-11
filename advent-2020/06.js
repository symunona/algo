const fs = require('fs'), _ = require('underscore')

let groups = fs.readFileSync('./06.in', 'utf8')
    .split('\n\n').map((group)=>{
        let questions = {}
        let dudes = group.split('\n').map((line)=>{
            line.split('').map((question)=>{
                questions[question] = questions[question] || 0
                questions[question]++
            })
        }).length
        return { questions, length: dudes };
    })

var yeses = groups.reduce((p, group)=>{
    let allYessesInGroup =
        Object.keys(group.questions).filter((q)=>group.questions[q] === group.length).length
    return p + allYessesInGroup
}, 0)

console.log(yeses)


