const fs = require('fs'), _ = require('underscore')

var crt, mulInv;

  crt = function(n, a) {
    var ai, ni, p, prod, sum, _i, _len, _ref, _ref1;
    sum = 0;
    prod = n.reduce(function(a, c) {
      return a * c;
    });
    _ref = _.zip(n, a);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref1 = _ref[_i], ni = _ref1[0], ai = _ref1[1];
      p = Math.floor(prod / ni);
      sum += ai * p * mulInv(p, ni);
    }
    return sum % prod;
  };

  mulInv = function(a, b) {
    var b0, q, x0, x1, _ref, _ref1, _ref2;
    b0 = b;
    _ref = [0, 1], x0 = _ref[0], x1 = _ref[1];
    if (b === 1) {
      return 1;
    }
    while (a > 1) {
      q = Math.floor(a / b);
      _ref1 = [b, a % b], a = _ref1[0], b = _ref1[1];
      _ref2 = [x1 - q * x0, x0], x0 = _ref2[0], x1 = _ref2[1];
    }
    if (x1 < 0) {
      x1 += b0;
    }
    return x1;
  };



let input = fs.readFileSync('./13.in','utf8').split('\n')

let allBuses = input[1].split(',')
let buses = allBuses.filter((b)=>b!=='x').map((b)=>{
    return {
        id: parseInt(b),
        m: allBuses.indexOf(b)
    }
})

console.log(JSON.stringify(buses))

// m * x1 + indexes(x1) = m * x2 + indexes(x2) = m * ...

buses = buses.map((b)=>{
    return {
        id: b.id,
        m: b.m
    }
})

let busMap = {}
buses.map((b)=>busMap[b.id] = b.m)

let id = _.pluck(buses, 'id')
let m = _.pluck(buses, 'm').map((m, i)=>id[i] - m)

console.log(id)
console.log(m)

let sol = crt(id, m)
console.log(sol)

// console.log('the end', step)

console.log(buses.map((b)=>`x = ${b.m} mod ${b.id}`).join('\n'))

debugger