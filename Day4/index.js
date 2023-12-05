const { register } = require("module");
const utils = require("../utils/utils");
const lines = utils.splitByLine("./Files/part2.txt");

const winningNumbersRegex = new RegExp(/(?!\d+:)\d+/g);
const myNumbersRegex = new RegExp(/\d+/g);

let ptOneTotal = 0;
const cardCount = new Array(lines.length).fill(1); //pt 2
lines.forEach((line, lineIndex) => {
    [winningNumbers, myNumbers] = line.split("|");
    matchedWinningNumbers = [...winningNumbers.matchAll(winningNumbersRegex)].map(subArray => subArray[0]);
    matchedMyNumbers = [...myNumbers.matchAll(myNumbersRegex)].map(subArray => subArray[0]);

    const intersection = matchedMyNumbers.filter(value => matchedWinningNumbers.includes(value));
    const totalMatches = intersection.length;
    if (totalMatches > 0) {
        ptOneTotal += 2 ** (totalMatches - 1);
    }
    for (let index = lineIndex + 1; index <= lineIndex + totalMatches; index++) { //pt 2
        cardCount[index] += 1 * cardCount[lineIndex];
    }

})
console.log(ptOneTotal)

const sumPt2 = cardCount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sumPt2); // Output: 15