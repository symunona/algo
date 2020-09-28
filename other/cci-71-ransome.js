// Source: Cracking the coding interview page 71:

// A ransom note can be formed by cutting words out of a magazine
// to form a new sentence.
// How would you figure out if a ransom note (represented as a string)
// can be formed from a given magazine (string)? (Ignore case)

const source = 'This is the beginning of a beautiful friendship. How about a new pipe, bro? '
    +'Will you be at my service when I try to establish connection with my new Stargate? '
    +'I will find the right tools to bring you. '
    +'Bring us the new rule of the worlds.'

const note = 'The stargate will bring us to new worlds'

ransom(note, source)

function ransom(note, source){
// Create a word map. Ignore case. Remove punctuations.
    let noteWordMap = createWordMap(note)
    let sourceWordMap = createWordMap(source)

    let missing = {}

    for (let word in noteWordMap){
        if (!sourceWordMap[word]){
            missing[word] = 1
        }
        if (sourceWordMap[word] < noteWordMap[word]){
            missing[word] = noteWordMap[word] - sourceWordMap[word]
        }
    }
    if (Object.keys(missing).length){
        console.warn(`Not possible, missing the following words: ${Object.keys(missing).map((word)=>`${word}(${missing[word]})`).join(', ')}`)
    } else {
        console.log('It is possible!')
    }
}



function createWordMap(string){
    let map = {}
    string.replace(/[\.\?\!\,]/g,' ').split(' ').map((word)=>{
        string.split(' ').map((word)=>{
        let w = word.toLowerCase()
        map[w] = map[w] || 0
        map[w]++
    })
    return map
}