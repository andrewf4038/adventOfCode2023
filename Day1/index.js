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
    const foundStringNums = [...utils.spelledNumberFinder(line)];
    let forwardLine = "";
    let backwardLine = "";
    if (foundStringNums.length > 0) {
        forwardLine = line.replaceAll(foundStringNums[0][1], utils.stringToNumber(foundStringNums[0][1]));
        backwardLine = line.replaceAll(foundStringNums[foundStringNums.length - 1][1], utils.stringToNumber(foundStringNums[foundStringNums.length - 1][1]))
    } else {
        forwardLine = line;
        backwardLine = line;
    }

    firstNumbersPtTwo[lineIndex] = utils.numberFinder(forwardLine)[0];
    const backwardFoundNumbers = utils.numberFinder(backwardLine);
    lastNumbersPtTwo[lineIndex] = backwardFoundNumbers[backwardFoundNumbers.length - 1]
})

console.log(finalNumberCalc(firstNumbersPtTwo, lastNumbersPtTwo));

