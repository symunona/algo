
/* remove the minimum number of invalid parentheses in order to make the input string valid. Return A possible result.
Note: The input string may contain letters other than the parentheses ( and )
Example 1:
Input: "()())()"
Output: ["()()()", "(())()"]

LVL 2: return all possible results

*/

var input1 = '()())()'
var input2 = 'gaegewagea(gegeg)(gegeagea))(geagegeg()(gegeag)()ggageagae((('
var input3 = '((((('
var input4 = ')))))'
var input5 = 'whatsaaaaaaaaaaaaap'
var input6 = '))))(((('
var input7 = '()))))(((()'

// console.log(parValidator(input1))
console.log(input7)
console.log(parValidator(input7))


// O(input.length)
function parValidator(input){
    input = input.split('')
    var parGroups = 0
    var i = 0
    while(i < input.length){
        if (input[i] === '('){
            parGroups ++
            i++
        } else if (input[i] === ')'){
            parGroups --
            if (parGroups < 0){
                parGroups = 0
                input.splice(i, 1)
            } else {
                i++
            }
        } else {
            i++
        }
    }
    var j = input.length
    while (parGroups > 0 && j >= 0){
        j--
        if (input[j] === '('){
            input.splice(j, 1)
            parGroups--;
        }
    }
    return input.join('')
}