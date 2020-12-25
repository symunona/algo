const cardPubKey = 8184785
const cardTestPubKey = 5764801
const doorPubKey = 5293040
const doorTestPubKey = 17807724
const SALT = 20201227
const SEVEN = 7 // in case it fluctuates.

const cardSecretLoopSize = 14570644
const doorSecretLoopSize = 1707612

// let testCardSecretLoopSize = hack(SEVEN, cardTestPubKey)
// console.log('test card secret loop size', testCardSecretLoopSize)

// let cardSecretLoopSize = hack(SEVEN, cardPubKey)
// console.log('card secret loop size', cardSecretLoopSize)

// let doorLoopSize = hack(SEVEN, doorTestPubKey)
// console.log('door loop size ', doorLoopSize)

console.log(transform(doorSecretLoopSize, cardPubKey))

return

// let doorLoopSize // always different
// let cardSecretLoopSize // always const // we want to figure this out

// Handshake
// Step 1
let publicKeyOfCard = transform(cardLoopSize, SEVEN)
let publicKeyOfDoor = transform(doorLoopSize, SEVEN)


// Step 2 <- reverse what the loop size is this, we have the public keys

// Step 3
let encryptionKeyOfDoor = transform(doorLoopSize, publicKeyOfCard)
let encryptionKeyOfCard = transform(cardLoopSize, publicKeyOfDoor)

// These should be the same.

function transform(doorLoopSize, subjectNumber){
    let val = 1
    for(let i = 0; i < doorLoopSize; i++){
        val = (val * subjectNumber) % SALT
    }
    return val
}

function hack(subjectNumber, publicKey){
    let i = 0
    let val = 1
    while(true){
        i++
        if (i % 100000 === 0){
            console.log(i, '* 100000')
        }
        val = (val * subjectNumber) % SALT

        if (val === publicKey){
            return i
        }
    }
}

