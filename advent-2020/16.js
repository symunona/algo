const fs = require('fs'), _ = require('underscore')

let file = fs.readFileSync('./16.in','utf8').split('\n\n');

let bulkRanges = []

let ruleMap = {}

let rules = file[0].split('\n').map((line, i)=>{
    line = line.split(': ')
    let key = line[0]
    let ranges = line[1].split(' or ')
        .map((range)=>{
            oneRange = range.split('-').map((n)=>parseInt(n))
            bulkRanges.push(oneRange)
            return oneRange
        })
        ruleMap[key] = ranges;
    return {key, ranges}
})


let nearby = file[2].split('\n').map((line)=>line.split(',').map((n)=>parseInt(n))).slice(1)
let errors = []
let validTickets = nearby.filter(isValid)

console.log('valid', validTickets.length, validTickets)
// console.log('invalid', nearby.length - validTickets.length)
// console.log('error rate', errors.reduce((p, n)=>p+n, 0))

function isValid(ticket){
    for(let i = 0; i<ticket.length; i++){
        if (!bulkRanges.find((range)=>
            ticket[i] >= range[0] &&
            ticket[i] <= range[1])
        ){
            errors.push(ticket[i])
            return false
        }
    }
    return true
}

function valueMatchesRange(value, range){
    return value >= range[0] && value <= range[1]
}

let positionValues = Object.keys(validTickets[0]).map(()=>[])
validTickets.map((ticket)=>ticket.map((number, i)=>positionValues[i].push(number)))

console.log(positionValues);

let possibleFields = []

positionValues.map((fieldValues)=>{
    let possibleRuleSets = rules.filter((rule)=>{
        // find one that does not match
        return !fieldValues.find((value)=>{
            return !valueMatchesRange(value, rule.ranges[0]) &&
                !valueMatchesRange(value, rule.ranges[1])
        })
    })
    possibleFields.push(possibleRuleSets)
})

console.log(possibleFields)
// Now arrange them, pick always the one that has only one element.
let keyOrder = new Array(Object.keys(possibleFields))

for(let k = 0; k < possibleFields.length; k++){
    let field = possibleFields.find((field)=>field.length === 1)
    let indexOfField =  possibleFields.indexOf(field);
    let fieldName = field[0].key
    console.log(`sanity check: ${k} ${fieldName} - i ${indexOfField} len: `, possibleFields.filter((field)=>field.length === 1).length)
    keyOrder[indexOfField] = fieldName;
    // Filter out all of them
    possibleFields.map((line)=>{
        let indexOfField = line.indexOf(_.find(line, {key: fieldName}))
        if (indexOfField > -1) {
            line.splice(indexOfField, 1)
        }
    })
}
console.log(keyOrder)


let myTicket = file[1].split('\n')[1].split(',').map((n)=>parseInt(n))
console.log(myTicket);
let mult = 1
for (let l=0; l < myTicket.length; l++){
    let fieldName = keyOrder[l];
    if (fieldName.indexOf('departure')===0){
        mult *= myTicket[l]
        console.log(keyOrder[l], myTicket[l])
    }
    let ranges = ruleMap[fieldName];
    if (!valueMatchesRange(myTicket[l], ranges[0]) &&
    !valueMatchesRange(myTicket[l], ranges[1])){
        debugger;
    }
}
console.log(mult)


debugger

// 2080856124271 is too high
// 1439429522627

