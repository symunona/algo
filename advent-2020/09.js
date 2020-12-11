const fs = require('fs'), _ = require('underscore');

const length = 25 // 25

let input = fs.readFileSync('./09.in', 'utf8')
    .split('\n').map((n)=>parseInt(n))

let preamble = input.slice(0,length)

let breaking

for(let i = length; i < input.length; i++) {
    if (!isValid(preamble, input[i])){
        debugger;
        breaking = i
        break;
    }
    preamble.push(input[i])
    preamble.shift()
}

console.log(breaking, preamble.join(', ') + ' invalid: ', input[breaking])

let invalid = input[breaking]

let i = breaking - 1, j
while (i > 0){
    let sum = input[i]
    j = i - 1
    while(sum < invalid && j > 0){
        sum += input[j--]
    }
    if (sum === invalid){
        console.log('found it!')
        break
    }
    i--
}

console.log(`indexes: ${j}...${i-1} = First: ${input[j]} Last: ${input[i-1]}`)
let sum = 0
for(let k = j + 1; k <= i; k++){
    console.log(k, input[k], sum = sum + input[k])
}
console.log(sum)

let range = input.slice(j + 1, i + 1)
console.log(range)

let smallest = Math.min.apply(this, range)
let largest = Math.max.apply(this, range)

console.log(smallest, largest, smallest + largest)
// 30436657 is too low
// 35156548 is not the right answer

function isValid(preamble, nextValue){
    for(let i = 0; i < preamble.length - 1; i++){
        for(let j = i; j < preamble.length; j++){
            if (preamble[i] + preamble[j] === nextValue){
                return true
            }
        }
    }
}

