
/* remove the minimum number of invalid parentheses in order to make the input string valid. Return A possible result.
Note: The input string may contain letters other than the parentheses ( and )
Example 1:
Input: "()())()"
Output: ["()()()", "(())()"]

LVL 2: return ALL possible results
https://medium.com/javascript-in-plain-english/facebook-on-site-technical-interview-1264cacad263

*/
const _ = require('lodash')

var input1 = '()())()'
var input2 = 'gaegewagea(gegeg)(gegeagea))(geagegeg()(gegeag)()ggageagae((('
var input2 = 'gaegewagea(gegeg)(gegeagea))(geagegeg()(gegeag)((()ggageagae'
var input3 = '((((('
var input4 = ')))))'
var input5 = 'whatsaaaaaaaaaaaaap'
var input6 = '))))(((('
var input7 = '()))))(((()'

var input = input2
console.log(input)
console.log(JSON.stringify(parVal(input)))
console.log('')


function parVal(input){
    input = input.split('')
    var solutions = parValidatorReq(input, 0)
    // Now we have to filter duplicates.
    return _.uniq(solutions);
}

// O(input.length)
function parValidatorReq(input, startFrom){
    var parGroups = 0
    // We assume, that left from here is already good.
    var i = startFrom
    console.log(' - ', input.join(''))
    while(i < input.length){
        if (input[i] === '('){
            parGroups ++
            i++
        } else if (input[i] === ')'){
            parGroups --
            if (parGroups < 0){
                parGroups = 0
                // There is a closing bracket without an opening one.
                // We can only fix this by removing this one, or any of the former closing brackets.
                // Possibilities:
                // We can remove each index from before here.
                // For each, call the solution
                // If we have more than one closing positions from before
                // Example:
                // 0123x
                // ()())
                // when we are here, we get to decide, if we are removing opening on 3 or 1.
                var closingPositions = getCharacterPositionsBefore(input, ')', i)
                if (closingPositions.length > 1){
                    // Start parValidator for each possible scenario.
                    // Do not go forward, because each of them will have their own playout.
                    var solutions = []
                    closingPositions.map(function(position){
                        // Space complexity increase!
                        var newInput = input.slice()
                        newInput.splice(position, 1)
                        solutions = solutions.concat(parValidatorReq(newInput, position))
                    })
                    return solutions;
                } else {
                    // There is only one way we can go.
                    input.splice(i, 1)
                }
            } else {
                i++
            }
        } else {
            i++
        }
    }

    // Tail the opening: if there was no closing bracket from right to left,
    // we do not have a choice but to remove these openings.
    // Example: We will delete the 3 x-es from the end.
    // 012345xxx
    // ((()))(((

    // 012345xxx
    // ((()))((())(((

    var j = input.length
    while (parGroups > 0 && j >= 0 && input[j] !== ')'){
        j--
        if (input[j] === '('){
            // As long as it's an opening bracket, we just delete it.
            input.splice(j, 1)
            parGroups--
        }
    }

    // Now if we removed all that we could, and we still have opened groups
    // we have multiple options to decide which opening brackets to remove.
    // Example:
    // 0123456789
    // 1210123432
    // (())(((()) - 2
    // We have to check for each in the last group:
    // 0,1 -> we can not delete these
    // 4,5,6,7 -> but we can delete two of these.
    //
    // We have to call it as many times, as there is one.
    // Find all opening indexes in current input:
    return removeOpenings(input, parGroups)
}

function removeOpenings(input, remainingParGroups) {
    // Check if there are still groups open:
    if (!remainingParGroups){
        // Woohoo! We do not have unfinished groups!
        return input.join('')
    }

    // Find all the opening brackets left from where we are.
    //     012321 - till the last 0 we can go back!
    // ())()((())
    //     012321
    // ())()((())
    var lastValidGroupStart = input.length;
    var groups = remainingParGroups
    var openingsThatCanBeRemoved = []
    while (groups > 0 && lastValidGroupStart > 0){
        lastValidGroupStart--
        if (input[lastValidGroupStart] === ')') { groups++ }
        if (input[lastValidGroupStart] === '(') {
            groups--
            openingsThatCanBeRemoved.push(lastValidGroupStart)
        }
    }
    // if (openingsThatCanBeRemoved.length === 0) { return input } // this can not really be, because we would not get this far, we'd remove these in the former step.

    // Removing each option may be a different scenario, so let's call the removeOpening for each.
    // Yes, there would be space to optimize here. We'd need to write an n under m combination runner.
    // We do the toothpick with an axe here, as long as it works.
    if (openingsThatCanBeRemoved.length > 1){
        var solutions = []
        openingsThatCanBeRemoved.map((openingPosition) => {
            // Space complexity increase!
            var newInput = input.slice();
            newInput.splice(openingPosition, 1)
            solutions = solutions.concat(removeOpenings(newInput, remainingParGroups - 1))
        })
        return solutions
    }
    // If there is only one opening, we have to remove that, and we are happy.
    return input.splice(openingsThatCanBeRemoved[0], 1).join('');
}




function getCharacterPositionsBefore(input, char, max){
    var indexes = []
    for (let i = 0; i<max; i++){
        if (input[i] === char) { indexes.push(i) }
    }
    return indexes
}