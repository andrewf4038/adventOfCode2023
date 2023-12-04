const utils = require("../utils/utils")
const lines = utils.splitByLine("./Files/part1.txt")

// Find where the characters are located
const charMatchRegEx = new RegExp(/[^a-zA-Z0-9.]/gm);
const numMatchRegEx = new RegExp(/\d+/gm);
const starMatchRegex = new RegExp(/\*/gm);

const numLocations = [];
const numbers = [];
const charLocations = [];
const starLocations = [];
lines.forEach((line, lineIndex) => {
    //full character match
    charMatches = [...line.matchAll(charMatchRegEx)];
    charMatches.forEach(charMatch => {
        charLocations.push([lineIndex, charMatch.index])
    })

    //number match
    numMatches = [...line.matchAll(numMatchRegEx)];
    numMatches.forEach(numMatch => {
        // console.log(numMatch);
        numLocations.push([lineIndex, numMatch.index, numMatch[0]]);
        numbers.push(numMatch[0]);
    })

    //star match
    starMatches = [...line.matchAll(starMatchRegex)];
    starMatches.forEach(starMatch => {
        starLocations.push([lineIndex, starMatch.index])
    })
})


// Compare results. I Want to take the number locations and individually search the charLocation array if that location exists or not

function charCloseLocations(lineIndex, startIndex, numLength) { // function generates all the positions to check
    const arr = [];
    arr.push([lineIndex, startIndex - 1]); //Left
    arr.push([lineIndex, startIndex + numLength]) // right
    arr.push([lineIndex - 1, startIndex - 1]) // up and left
    arr.push([lineIndex - 1, startIndex + numLength]) // up and right
    arr.push([lineIndex + 1, startIndex - 1]) // down and left
    arr.push([lineIndex + 1, startIndex + numLength]) // down and right
    for (let index = startIndex; index < startIndex + numLength; index++) {
        arr.push([lineIndex - 1, index]); //top values
    }
    for (let index = startIndex; index < startIndex + numLength; index++) {
        arr.push([lineIndex + 1, index]); //bottom values
    }
    return arr;
}

const closeNums = [];
const allCheckPos = [];
numLocations.forEach(numLocation => { // for loop takes each number, generates all the positions to check, and checks it against the known charlocations.
    const lineIndex = numLocation[0];
    const startIndex = numLocation[1];
    const num = numLocation[2];
    const numLength = num.length;
    const posToCheck = charCloseLocations(lineIndex, startIndex, numLength);
    allCheckPos.push({ num: num, position: posToCheck })
    posToCheck.forEach(pos => {
        if (charLocations.some(arr => JSON.stringify(arr) === JSON.stringify(pos))) {
            closeNums.push(num);
        }

    })
})

// Do a final sum on the numbers identified as being close
let sum = 0;
closeNums.forEach(num => {
    sum += Number(num);
})
// console.log(sum);

//----Part 2----
// I will generate a total list of all places to search. The place to search will have the number associated with it
// I save all the hits to a list.

const numsMatchedtoStars = [];
starLocations.forEach(star => {
    allCheckPos.forEach((pos) => {
        if (pos.position.some(arr => JSON.stringify(arr) === JSON.stringify(star))) {
            numsMatchedtoStars.push({ num: pos.num, starPos: star })
        }
        //charLocations.some(arr => JSON.stringify(arr) === JSON.stringify(pos))
    })
})

let ptFinal = 0;
numsMatchedtoStars.forEach((match, matchIndex) => {
    for (let index = matchIndex + 1; index < numsMatchedtoStars.length; index++) {
        if (JSON.stringify(numsMatchedtoStars[matchIndex].starPos) === JSON.stringify(numsMatchedtoStars[index].starPos)) {
            ptFinal += Number(numsMatchedtoStars[matchIndex].num) * Number(numsMatchedtoStars[index].num)
        }
    }
})

console.log(ptFinal);
// if the size of the list is >=2, then I multiply all items together, and add that to the sum total 
// I need to save the position of the gear as well

// If all that is correct, then I will take the generated list, and go through all of the objects. If the gearlocation of the object