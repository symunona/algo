const fs = require('fs'), _ = require('underscore')
const XRegExp = require('xregexp')

let input = fs.readFileSync('./19t2.in', 'utf8').split('\n\n');
let rules = {}
input[0].split('\n').map((ruleRaw, i)=>{
    let key = parseInt(ruleRaw.split(': ')[0])
    if (ruleRaw.split(': ')[1].startsWith('"')){
        rules[key] = ruleRaw.split(': ')[1].substr(1, 1)
    } else {
        rules[key] = ruleRaw.split(': ')[1].split(' | ').map((redirects)=>redirects.split(' ').map((n)=>parseInt(n)))
    }
})

let strings = input[1].split('\n')


console.log('middle', rule4231)
let middleMatcher = new RegExp(rule4231)

let matcherString = createRegex(rules[0], 0)
console.log(matcherString)
let matcherStrings = matcherString.split('( Y )')

let openedCount = 0, i = 0
while(i < matcherStrings[0].length){
    let c = matcherStrings[0].substr(i, 1)
    if (c === '(') openedCount++
    if (c === ')') openedCount--
    i++
}
console.log(openedCount)
console.log(new Array(openedCount + 1).join(')'))
matcherStrings[0] = '^' + matcherStrings[0] + new Array(openedCount + 1).join(')')
matcherStrings[1] = new Array(openedCount + 1).join('(') + matcherStrings[1] + '$'

// let matcher = new RegExp('^' + matcherString + '$')
console.log(matcherStrings)

let matching = strings.filter((s)=>{
    try{
        let ret = XRegExp.matchRecursive(s, matcherStrings[0], matcherStrings[1])
        // console.log(ret)
        // Hahh! if there is a sandwitch, we have to match it with 11!
        if (!ret || ret.length !== 1) return false
        if (ret[0] === '') return true;
        console.log('checiking:', ret[0], middleMatcher.test(ret[0]))
        return true;
        return middleMatcher.test(ret[0])
    } catch(e){
        return false
    }
})
// let matching = strings.reduce((p, s)=>p + (matcher.match(s)?1:0))

// 334 is too high
// 322 is too high
// 259 is too low

// did not try 63

console.log(matching.length)
debugger;