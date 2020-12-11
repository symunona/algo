const fs = require('fs'), _ = require('underscore')

let bags = {}
let reverse = {}
fs.readFileSync('./07.in', 'utf8')
    .split('\n').map((contain)=>{
        let parent = contain.split(' bags contain ')[0]
        reverse[parent] = { children: {}}
        contain.split(' bags contain ')[1].split(', ')
            .map((child)=>{
                if (child.split(' ')[0] == 'no'){ return; }
                let count = parseInt(child.split(' ')[0])
                let name = child.split(' ')[1] + ' ' + child.split(' ')[2]
                bags[name] = bags[name] || { children: {} }
                bags[name].children[parent] = count
                reverse[parent].children[name] = count
            })
    })

let target = 'shiny gold'
let haveBeenHere = {}

dfs(target, haveBeenHere)

function dfs(root, haveBeenHere){
    if (haveBeenHere[root]){ return true }
    haveBeenHere[root] = true
    if (!bags[root]) return true;
    for ( let child in bags[root].children ){
        dfs(child, haveBeenHere)
    }
    return true
}

let howManyBags = bfs(target)

function bfs(root){
    let subBags = 0
    for ( let child in reverse[root].children ){
        let childBags = bfs(child)
        subBags += reverse[root].children[child] * (childBags + 1)
    }
    return subBags
}

console.log(howManyBags)


