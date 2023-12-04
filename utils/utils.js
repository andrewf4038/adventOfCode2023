const fs = require("fs");

const splitByLine = (inputText) => {
    const text = fs.readFileSync(inputText, encoding = "utf8");
    const splitText = text.split("\n");
    return splitText;
}

const numberFinder = (input) => {
    const result = input.match(/\d/g);
    if (result) {
        return result
    } else return ['-1']
}

const spelledNumberFinder = (input) => {
    const result = input.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine))/gm);
    return result ? result : [];
}

const subCount = (str, substring) => {
    const regex = new RegExp(`${substring}`, "g");
    let match;
    let lastMatchIndex = -1;
    let subCount = 0;
    while ((match = regex.exec(str)) !== null) {
        lastMatchIndex = match.index;
        subCount++;
    }

    return subCount;
}

const stringToNumber = (input) => {
    switch (input) {
        case "one": return "1";
            break;
        case "two": return "2";
            break;
        case "three": return "3";
            break;
        case "four": return "4";
            break;
        case "five": return "5";
            break;
        case "six": return "6";
            break;
        case "seven": return "7";
            break;
        case "eight": return "8";
            break;
        case "nine": return "9";
            break;
        case "zero": return "0";
            break
        default:
            break;
    }
}


module.exports.splitByLine = splitByLine;
module.exports.stringToNumber = stringToNumber;
module.exports.numberFinder = numberFinder;
module.exports.spelledNumberFinder = spelledNumberFinder;
module.exports.subCount = subCount;

