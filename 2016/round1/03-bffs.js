// Source: https://codingcompetitions.withgoogle.com/codejam/round/0000000000201bf2/0000000000201b6f

// Largest circle of kids with their bffs next to them.


const fs = require('fs')

let content = fs.readFileSync(0, 'utf8');
let lines = content.split(/\r?\n/);
let cases = +lines[0];

let out = [];
let lp = 1
for (let i = 1; i <= cases; i++) {
    let result = solve(+lines[lp++], lines[lp++].split(' '));
    out.push(`Case #${i}: ${result}`);
}

function solve(kidCount, friendConnections){
    // Put all the mutual pairs together,
    // then try to put the one way connections in of these people,
    // than until we run out, then make a circle.
    let graph = {}
    let groups = []
    // find pairs
    for(let i = 0; i < kidCount; i++){
        if (friendConnections[friendConnections[i]] == i){
            groups.push([i, friendConnections[i]])
        }
    }
    // Build Reference Friend Graph
    for(let i = 0; i < kidCount; i++){
        // Who considers i as BFF
        graph[i] = friendConnections.filter((f)=>f==i).map((f)=>{
            return {
                befrendeg
            }
        })
    }

    // Start building graphs: the longest the better
    // Go over the pairs, and find the longest chains.

}

function getAllTheFriendsOfPerson(){

}