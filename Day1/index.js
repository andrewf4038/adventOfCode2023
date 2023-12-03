const utils = require("../utils/utils")

const lines = utils.splitByLine("./Files/part1.txt")
const firstNumbers = [];
const lastNumbers = [];

function findFirstandLastNumbers(firstArray, lastArray, line, lineIndex) {
    const foundNumbers = utils.numberFinder(line);
    firstArray[lineIndex] = line[line.indexOf(foundNumbers[0])];
    lastArray[lineIndex] = line[line.indexOf(foundNumbers[foundNumbers.length - 1])];
}

function finalNumberCalc(firstArray, lastArray) {
    let finalNumber = 0;
    for (let index = 0; index < firstArray.length; index++) {
        const stringNum = firstArray[index] + lastArray[index];
        finalNumber += Number(stringNum);
    }
    return finalNumber;
}

lines.forEach((line, lineIndex) => {
    findFirstandLastNumbers(firstNumbers, lastNumbers, line, lineIndex)
})

console.log(finalNumberCalc(firstNumbers, lastNumbers));

// ----Part 2----
const linesPtTwo = utils.splitByLine("./Files/part2.txt");
const firstNumbersPtTwo = [];
const lastNumbersPtTwo = [];

linesPtTwo.forEach((line, lineIndex) => {
    const origLine = line;
    const foundStringNums = utils.spelledNumberFinder(line);
    foundStringNums.forEach((stringNum) => {
        line = line.replaceAll(stringNum, utils.stringToNumber(stringNum));
    })
    findFirstandLastNumbers(firstNumbersPtTwo, lastNumbersPtTwo, line, lineIndex)
    // console.log(origLine, "-", line, "-", firstNumbersPtTwo[lineIndex], "-", lastNumbersPtTwo[lineIndex], "-", firstNumbersPtTwo[lineIndex] + lastNumbersPtTwo[lineIndex])
})

console.log(finalNumberCalc(firstNumbersPtTwo, lastNumbersPtTwo));
