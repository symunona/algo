const _ = require('underscore')
//            0   1   2   3   4   5   6   7
let input = [30, 15, 60, 75, 45, 15, 15, 45]
//             0   1
let input2 = [15, 90, 30, 60, 75, 45, 15, 15, 45]
// Every time I choose one, I can not choose the following, but I can choose whichever after.
// Each case, I have to decide, if I jump one, or two forward, because if I'd have to jump more,
// I could already pick both. by skipping the values in between.

// Let's build a tree, where we see what happens if I pick the

//           0
//      15       90
//    30  60   60  75
// Let's store for each branch, the value that it has added!

let leaves = []

let root = {value: 0, 0: {}, 1: {}}

buildReservationTree(input, 0, 0, root[0], root, leaves)
buildReservationTree(input, 1, 0, root[1], root, leaves)
console.log(leaves)

// Now find the leaves with the highest values, and print their indexes

// Find max of leaves!
let max = Math.max.apply(this, _.pluck(leaves, 'value'))
let routes = leaves.filter((leave)=>leave.value === max)

// Print the routes
console.log('max', max)
console.log('route(s)')
console.log(routes.map(getRouteFromLeave).join('\n'))
debugger;

function getRouteFromLeave(leaf){
    let indexes = []
    while(leaf.parent){
        // Find which child is this?
        // This is quick and very dirty JS magic solution.
        let key = Object.keys(leaf.parent).find((key)=>leaf.parent[key] === leaf)
        indexes.unshift(key)
        leaf = leaf.parent
    }
    return indexes;
}

function buildReservationTree(timeslots, index, value, node, parent, leaves){
    node.value = value + timeslots[index]
    node.parent = parent
    if (index === timeslots.length - 2){
        leaves.push(node)
    }
    //      5  6  7 -> length = 8
    // ... 15 15 15

    if (index === timeslots.length - 3){
        node[index + 2] = {value: node.value + timeslots[index + 2], parent: node}
        leaves.push(node[index + 2])
        // Add an end value
    }

    if (index < timeslots.length - 3){
        // From index, we can pick 0 or 1
        node[index + 2] = {}
        buildReservationTree(timeslots, index + 2, node.value, node[index + 2], node, leaves)
        node[index + 3] = {}
        buildReservationTree(timeslots, index + 3, node.value, node[index + 3], node, leaves)
    }
    return
}