// Source: Cracking the coding interview page 70: find acronyms in O(b) time!

// Find all the acronyms of `s`, given in string `b`.

let s = 'abbc'
let b = 'cbabadcbbabbcbabaabccbabc'

let signature = {}

// Create a signature map
s.split('').map((c)=>{
    signature[c] = signature[c] || 0
    signature[c] ++;
})

let result = []
let sliderMap = {}
let matchingLetters = 0
let lettersToMatch = Object.keys(signature).length

// This is for debug only
let currentlyMatchingMap = {}

// Let's make an array out of the string!
let bSplit = b.split('')

// O(b.length)
for(let i = 0; i < b.length; i++) {
    // Add the letter currently being processed, and add to the letter count if a letter is just fine.
    let c = bSplit[i]
    addCharacterToMap(c, i)

    // If we left the first s.length characters, let's start removing characters from the sliding window.
    if (i >= s.length) {
        let charToRemove = b[ i - s.length ]
        removeCharacterFromMap(charToRemove, i)
    };

    // If we are at least search string length into the string, lets start checking if the current
    // sliding window has all the necessary characters to have.
    // We maintain a matchingLetters counter that increases, when we have exactly the
    // the number of letters
    if(i >= s.length - 1) {
        // Now we can start checking for matching coordinates
        console.log(i-s.length + 1, i, sliderMap, currentlyMatchingMap, ' - ', matchingLetters)

        if (matchingLetters === lettersToMatch){
            console.log('match at index: ', i - s.length + 1)
            result.push(i-s.length + 1)
        }
    }
}

/**
 * Save the character to our slide window map.
 * O(1)
 * @param {Char} c
 */
function addCharacterToMap(c){
    if (!signature[c]) return;
    sliderMap[c] = sliderMap[c] || 0
    sliderMap[c] ++
    keepMatchingUpToDate(c)
}

/**
 * O(1)
 * @param {Char} c
 */
function removeCharacterFromMap(c){
    if (!signature[c]) return;
    sliderMap[c] --
    keepMatchingUpToDate(c)
}

/**
 * When any of the currently matching letter's change, lets
 * increment or decrement the number of matching letter count.
 * O(1)
 * @param {String} c
 */
function keepMatchingUpToDate(c){
    let wasItGoodBefore = currentlyMatchingMap[c]
    currentlyMatchingMap[c] = checkIfCharacterCountMatching(c)
    let didItChange = (!!wasItGoodBefore) != (!!currentlyMatchingMap[c])
    if (didItChange){
        if (currentlyMatchingMap[c]){
            matchingLetters ++
        } else {
            matchingLetters --
        }
    }
}

// Check if c has the correct number of the map
function checkIfCharacterCountMatching(c){ return sliderMap[c] === signature[c] }

console.log(result);

process.exit(0);
