const fs = require('fs'), _ = require('underscore')
const XRegExp = require('xregexp')

let input = fs.readFileSync('./19b.in', 'utf8').split('\n\n');
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


function createRegex(key){
    let rule = rules[key]
    if (_.isString(rule)){
        return rule;
    } else {
        if (key === 8){
            debugger;
            return `_`
        }
        else if (key === 11){
            debugger;
            return `_`
        }
        else {
            return '(' +
                rule.map((ors)=>'(' +
                    ors.map((index)=>createRegex(index))
                    .join('') + ')' )
                .join('|')
                + ')'
        }

    }
}


// 0: 8 11 is starting
// 8: 42 | 42 8 // -> (42)+
// 11: 42 31 | 42 11 31 // -> 42*n + 31*n
// 8 then 11 => (42(min(N+1)))(31N)

// Match 31s, then that many 42s, then if it has 42s left we won.

let rule = new RegExp(`^(?<g42>(${createRegex(42)})+)(?<g31>(${createRegex(31)})+)$`)

let rule31 = new RegExp(createRegex(31), 'g')
let rule42 = new RegExp(createRegex(42), 'g')

console.log(rule)

let matching = strings.filter((s, i)=>{
    let res = rule.exec(s)
    if (!res) {
        return false;
    }
    let m42 = res.groups.g42.match(rule42)
    let m31 = res.groups.g31.match(rule31)
    let m42count = m42.length
    let m31count = m31.length

    console.log(m42count > m31count, m42count, m31count, s)

    return m42count > m31count
})

function shortest(array){
    if (!array) return -1
    return array.filter((f)=>f).sort((a,b)=>a.length - b.length)[0]
}


function longest(array){
    if (!array) return 0
    return array.filter((f)=>f).sort((a,b)=>b.length - a.length)[0]
}

// let matching = strings.reduce((p, s)=>p + (matcher.match(s)?1:0))

// 334 is too high
// 322 is too high
// 259 is too low

// did not try 63

console.log(matching.length)
debugger;