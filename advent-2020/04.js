const fs = require('fs')

let passports = [], i = 0
let validEyeColors = 'amb blu brn gry grn hzl oth'.split(' ')


fs.readFileSync('./04.in', 'utf8')
    .split('\n\n').map((passportGroupLines)=>{
        passports[i] = {}
        passportGroupLines.split('\n').map((line)=>{
            line.split(' ').map(((keyValuePair)=>{
                let key = keyValuePair.split(':')[0]
                let value = keyValuePair.split(':')[1]
                passports[i][key] = value
            }))
        })
        i++
    })

let valid = passports.filter((passport)=>Object.keys(passport).length === 8 ||
    (Object.keys(passport).length === 7 && 
    Object.keys(passport).indexOf('cid') === -1))
    .filter((p)=>{
        p.byr = parseInt(p.byr)
        p.iyr = parseInt(p.iyr)
        p.eyr = parseInt(p.eyr)
        p.hgu = p.hgt.substr(-2)
        p.hgt = parseInt(p.hgt)
        if (p.byr < 1920 || p.byr > 2002 ) { ;; return false }
        if (p.iyr < 2010 || p.iyr > 2020 ) { ;; return false }
        if (p.eyr < 2020 || p.eyr > 2030 ) { ;; return false }
        if (p.hgu === 'cm'){
            if (p.hgt < 150 || p.hgt > 193) { ;; return false }
        } else if (p.hgu === 'in'){
            if (p.hgt < 59 || p.hgt > 76) { ;; return false }
        } else { ;; return false }
        if (!p.hcl.match(/^#([0-9a-f]{6})$/i)) { ;; return false }
        if (validEyeColors.indexOf(p.ecl) === -1) { ;; return false }
        if (p.pid.length !== 9) { ;; return false }
        if (!p.pid.match(/^([0-9]{9})$/i)) { ;; return false }

        ;

        return true

    }).length

console.log(passports, valid)

