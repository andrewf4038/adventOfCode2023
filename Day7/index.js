const { fork } = require("child_process");
const utils = require("../utils/utils");
const lines = utils.splitByLine("./Files/part1.txt");
const hands = [];
lines.forEach(line => {
    const handsAndBids = line.split(" ");
    hands.push({
        hand: handsAndBids[0].replaceAll("T", "B").replaceAll("J", "C").replaceAll("Q", "D").replaceAll("K", "E").replaceAll("A", "F"),
        bid: Number(handsAndBids[1])
    });
})

const test = "1212asdf";



function cardMatches(numResults) {
    switch (numResults) {
        case 1: //high card
            return 0;
            break;
        case 2:
            return 1;
            break;
        case 3:
            return 3;
            break;
        case 4:
            return 5;
            break;
        case 5:
            return 6;
            break;
        default:
            break;
    }
}

function typer(hand, type = 0) {
    if (hand === "") {
        return type;
    }
    const oneChar = hand[0];
    const oneCharRegex = new RegExp(oneChar, "g");
    const results = [...hand.matchAll(oneCharRegex)];
    type += cardMatches(results.length);
    // console.log("hand ", hand);
    // console.log("results.length ", results.length);
    // console.log("cardMatches result ", cardMatches(results.length))
    // console.log("type ", type);
    // console.log("\n");
    return typer(hand.replaceAll(oneChar, ""), type);

}

hands.forEach(hand => {
    let type = 0;
    hand.type = typer(hand.hand);
})


function sortHands(a, b) {
    if (a.type === b.type) {
        for (let index = 0; index < a.hand.length; index++) {
            if (a.hand[index] !== b.hand[index]) {
                return a.hand.charCodeAt(index) - b.hand.charCodeAt(index);
                break;
            };

        }

    } else {
        return a.type - b.type;
    }
}

// const newSort = hands.sort((a, b) => a.type - b.type);
const orderedHands = hands.sort(sortHands);

let pt1Result = 0;
orderedHands.forEach((hand, index) => {
    pt1Result += hand.bid * (index + 1);
})

console.log(pt1Result)


// Regex to set the type
// function to get all card values
// some kind of sorting alg 
// Is it an initial sort and then a fine tune? Probably a fine tune.
// We can create an object and store type and an array of values, that would help to order.