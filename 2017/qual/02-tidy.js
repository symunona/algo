// Source: 2017 qualification 02: https://codingcompetitions.withgoogle.com/codejam/round/00000000002017f7/0000000000201878

const fs = require('fs')

let content = fs.readFileSync(0, 'utf8');
let lines = content.split(/\r?\n/);
let cases = +lines[0];

let out = [];
for (let i = 1; i <= cases; i++) {
    var result = solve(lines[i].split(''));
    out.push(`Case #${i}: ${result}`);
}

// --------------------------------------

fs.writeFileSync(1, out.join('\n'));


// 215515214521
// 6363636336342142421421421
// 4242242


// 4242
// 3999

// 54
// 49

// 111110
//    |  |
// 33344422
// 33333399

// |    |
// 111110
// 999999


function solve(s){
    let firstWrongTransitionIndex = 1

    // Store the beginning the last group of numbers that were before the drop.
    //        l  f
    // e.g. 1233312 will have lastIncreaseIndex = 2 because 2 became 3 there,
    // and i will be 5, because that's where 3 became 1
    let lastIncreaseIndex = 0

    // Walk until the first drop.
    while ( firstWrongTransitionIndex < s.length && s[firstWrongTransitionIndex-1] <= s[firstWrongTransitionIndex]) {
        if (s[firstWrongTransitionIndex-1] < s[firstWrongTransitionIndex]) lastIncreaseIndex = firstWrongTransitionIndex
        firstWrongTransitionIndex++
    }

    // It's a tidy number
    if (firstWrongTransitionIndex === s.length) return s.join('')


    // If we did not get through, that means it's not a tidy number, and we have the point where it broke (i)
    // and we have the position where the number last increased (lastIncreaseIndex)

    // -----------

    // What was the last good group's value? Reduce it by one!
    let lastGroupCorrectValue = parseInt(s[lastIncreaseIndex]) - 1

    // Reduce the last good group's numbers by one. This will make them equal to the former group
    s[lastIncreaseIndex] = String(lastGroupCorrectValue)

    // Now let's fill in the rest with 9s

    for (let i = lastIncreaseIndex + 1; i < s.length; i ++){
        s[i] = '9'
    }

    // Remove zeros from beginning.
    let i = 0
    while (s[i] == '0') i++

    return s.slice(i).join('')

}

