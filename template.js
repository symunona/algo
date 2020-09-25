const fs= require('fs');

const input= fs.readFileSync(0,'utf8').trim().split('\n').slice(1)
  .filter((_,i)=>i%2);

console.log(input.map((e,i)=>`Case #${i+1}: ${solve(e)}`).join('\n'));