const fs = require('fs')

let input = fs.readFileSync('./10.in', 'utf8')
    .split('\n').map((n)=>parseInt(n))

input.sort((a,b)=>a-b)

console.log(input)
input.unshift(0)
input.push(input[input.length-1] + 3);

let diffs = {};
let groupsOf1 = [];
let onesInARow = 0
for(let i = 0; i < input.length - 1; i++){
    let diff = input[i+1] - input[i]
    diffs[diff] = diffs[diff] || 0
    diffs[diff]++

    if (diff === 1){
        onesInARow++
    } else {
        if (onesInARow > 0){
            groupsOf1.push(onesInARow)
        }
        onesInARow = 0
    }
}
console.log(diffs)
console.log(diffs[1] * diffs[3])
console.log('Groups of 1', groupsOf1)


function perms(n){
    switch(n){
        case 1: return 1 // 3 1 3 -> 2 numbers: 0* *3 *4 *7
        // I can also leave the middle one out
        case 2: return 2 // 3 1 1 3 -> 3 numbers: 0* *3 4 5* *9
        // I can leave 4 out, 5 out, or both, that's 4
        case 3: return 4 // 3 1 1 1 3 -> 4 numbers: 0* *3 (4 5)! 6* *9
        // I can leave 2 out max, 3 .. 7 has 4 step, so I need to leave one in at min
        // that means x, (4) (5) (6), (45), (46), (56) = 7
        // but also means that each of the rest, when I leave ony one out, there are still
        // two ways to align the rest: x -> 6, (4) (5) (6) -> 3 * 2, rest is 1, so 3
        case 4: return 7 // 3 1 1 1 3 -> 5 numbers: 0* *3 (4 5 6)! 7* *10
    }
}


function fact(num){
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}



console.log(groupsOf1.map(perms).reduce((p, c)=>p * c, 1))