// 21.js
const fs = require('fs'), _ = require('underscore')

let allergensEnglish = []
let allergenMap = {}

let foods = fs.readFileSync('./21.in', 'utf8').split('\n').map((line)=>{
    let langs = line.split(' (contains ')
    let lang0 = langs[0].split(' ')
    let eng = langs[1].substr(0, langs[1].length-1).split(', ')
    allergensEnglish = allergensEnglish.concat(eng)
    eng.map((allergen)=>{
        allergenMap[allergen] = allergenMap[allergen] || []
        allergenMap[allergen].push(lang0)
    })
    return [lang0, eng]
})

let common = {}

let allKeys = _.uniq(foods.reduce((p, c)=>p.concat(c[0]), []))
console.log('all ingredients list', allKeys)

for(let allergen in allergenMap){
    common[allergen] = findCommon(allergenMap[allergen])
}

function findCommon(arrays){
    let foreignKeysInAll = {}
    let allKeys = _.uniq(arrays.reduce((p, c)=>p.concat(c), []))
    // Now check all the keys in each line, increase number if found
    allKeys.map((key)=>{
        foreignKeysInAll[key] = arrays.reduce((p, lang0)=>lang0.indexOf(key)>-1?p+1:p, 0)
    })
    return allKeys.filter((key)=>{
        return foreignKeysInAll[key] && foreignKeysInAll[key] === arrays.length
    })
}

// console.log(allergenMap)
console.log(common)

let allergensLang0 = []
for(let eng in common){
    allergensLang0 = allergensLang0.concat(common[eng])
}
allergensLang0 = _.uniq(allergensLang0)
let notContainingAllergens = _.difference(allKeys, allergensLang0)
console.log('not containing allergens', notContainingAllergens)

// How many times do they appear?
let notAllergenCount = foods.reduce((prevFood, f)=>
    prevFood + notContainingAllergens.reduce((p, a)=>f[0].indexOf(a)>-1?p+1:p, 0)
    , 0)

// Find actual allergens
let translation = {}
while (Object.keys(translation).length < Object.keys(common).length){
    for(let eng in common){
        if (common[eng].length === 1){
            let current = translation[eng] = common[eng][0]
            // Remove it from the other spots
            for(let other in common){
                let index = common[other].indexOf(current)
                if (index > -1){
                    common[other].splice(index, 1)
                }
            }
        }
    }
}
console.log(translation)

console.log(Object.keys(translation).sort())
console.log(Object.keys(translation).sort().map((engKey)=>translation[engKey]).join(','))

console.log('occurrences of not allergic', notAllergenCount)



debugger;