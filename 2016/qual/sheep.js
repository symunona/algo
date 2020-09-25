const fs = require('fs')

let content = fs.readFileSync(0, 'utf8');
let lines = content.split(/\r?\n/);
let cases = +lines[0];

let out = [];
for (let i = 1; i <= cases; i++) {
    var [shield, program] = lines[i].split(' ');
    var result = solve(+shield, program);
    out.push(`Case #${i}: ${result}`);
}

fs.writeFileSync(1, out.join('\n'));

function solve(n){
    let digits = {}

    if (n == 0){
        return 'INSOMNIA'
    }

    let i = 1
    while (Object.keys(digits).length < 10){
        let newChars = {}
        String(i*n).split('').map((c)=>{
            digits[c] = true
            newChars[c] = true
        })
        Object.keys(digits).map((c)=>newChars[c] = false)
        i++
    }
    return (i-1)*n
}
