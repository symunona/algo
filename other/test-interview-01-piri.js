// 2020.09.28

const fs = require('fs')
let input = fs.readFileSync('./test-interview-01-piri.in', 'utf8')

input = input.split('\n')
input.shift()

// 10 message / sec rate limiting.
// We assume that messages come in linear
const messagesPerSec = 10
const windowSize = 1
const bufferSize = 5

console.log(input.map(proxyForward))

let queue = []
let buffer = []

/**
 *
 * @param {*} messageTimestamp
 */
function proxyForward(messageTimestamp, timeToProcess){
    // We assume that the current time is the message what just came in.
    // Let's see how many messages do we have in the buffer.
    // Only let the new message be added, if it fit's into the current window.
    // 1.- clean the stack until the current time's window.
    if (canItBeAddedRateLimit(messageTimeStamp) &&
        canItBeBuffered(messageTimeStamp, timeToProcess)){
        queue.push(messageTimestamp)
        buffer.push(messageTimestamp + timeToProcess)   // NOTE: pseudocode
        return true
    } else {
        // TODO: reject messages
        return false
    }
}

function canItBeAddedRateLimit(messageTimeStamp){
    while (buffer[0] <= messageTimeStamp) buffer.shift()

    if (buffer.length < bufferSize) return true
    return false
}

function canItBeAddedRateLimit(messageTimeStamp){
    // Check which messages ran out to this point
    let timeStampWindowStart = subtractSecondsFromTimeStamp(messageTimeStamp, windowSize)

    while (queue[0] <= timeStampWindowStart) queue.shift()

    if (queue.length < messagesPerSec) return true
    return false
     // pop <- 1.1 [ 1.3, 2.1] // 2.1 <- push

}

function subtractSecondsFromTimeStamp(timeStamp, seconds){
    // return timestamp - seconds sec
}
