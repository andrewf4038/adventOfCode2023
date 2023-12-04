const utils = require("../utils/utils")

const lines = utils.splitByLine("./Files/part1.txt")

const lineOne = lines[0];

const gameRegEx = new RegExp(/(?<=Game )(\d+)/g)
const redRegEx = new RegExp(/\b(\d+)\sred\b/g)
const greenRegEx = new RegExp(/\b(\d+)\sgreen\b/g)
const blueRegEx = new RegExp(/\b(\d+)\sblue\b/g);

function colorMatch(line, regex) {
    const matches = [...line.matchAll(regex)];
    const colorNumbers = [];
    matches.forEach((match) => {
        colorNumbers.push(match[1])
    })
    return colorNumbers;
}

function maxTester(matches, max) {
    let passTest = true;
    matches.forEach(match => {
        if (Number(match) > max) {
            passTest = false;
        }
    })
    return passTest;
}

const successfulGames = [];
lines.forEach((line) => {
    const gameNumber = line.match(gameRegEx);
    const redMatch = colorMatch(line, redRegEx);
    const greenMatch = colorMatch(line, greenRegEx);
    const blueMatch = colorMatch(line, blueRegEx);

    const redSuccess = maxTester(redMatch, 12);
    const greenSuccess = maxTester(greenMatch, 13);
    const blueSuccess = maxTester(blueMatch, 14);

    if (redSuccess && greenSuccess && blueSuccess) { //
        successfulGames.push(gameNumber);
    }
})

let successfulGameCount = 0;
successfulGames.forEach(game => {
    successfulGameCount += Number(game[0]);
})
// console.log(successfulGameCount);
//---- Part 2 ----
const linesPt2 = utils.splitByLine("./Files/part2.txt")

function maxColor(match) {
    let maxColorNumber;
    if (match.length === 0) {
        maxColorNumber = 0;
        return maxColorNumber;
    }
    maxColorNumber = Math.max(...match);
    return maxColorNumber;

}

let productSum = 0;

linesPt2.forEach((line) => {
    const gameNumber = line.match(gameRegEx);
    const redMatch = colorMatch(line, redRegEx);
    const greenMatch = colorMatch(line, greenRegEx);
    const blueMatch = colorMatch(line, blueRegEx);
    const product = maxColor(redMatch) * maxColor(greenMatch) * maxColor(blueMatch);
    productSum += product;
})

console.log(productSum)

