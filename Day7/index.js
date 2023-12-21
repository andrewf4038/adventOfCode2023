const { fork } = require("child_process");
const utils = require("../utils/utils");
const lines = utils.splitByLine("./Files/part1_test.txt");
const hands = [];
lines.forEach(line => {
    const handsAndBids = line.split(" ");
    hands.push({
        hand: handsAndBids[0].replaceAll("T", "B").replaceAll("J", "C").replaceAll("Q", "D").replaceAll("K", "E").replaceAll("A", "F"),
        bid: Number(handsAndBids[1])
    });
})

function cardMatches(numResults) {
    switch (numResults) {
        case 1:
            return 0; //high card
            break;
        case 2:
            return 1; // one pair
            break;
        case 3:
            return 3; //three of a kind
            break;
        case 4:
            return 5; // four of a kind
            break;
        case 5:
            return 6; // five of a kind
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
const orderedHands = [...hands];
orderedHands.sort(sortHands)

let pt1Result = 0;
orderedHands.forEach((hand, index) => {
    pt1Result += hand.bid * (index + 1);
})

// console.log(pt1Result)

// PT 2
hands.forEach(hand => { // Start by getting the card order with the replace corrected where J is the lowest.
    hand.hand = hand.hand.replaceAll("C", "1")
})

function typer2(hand, type = 0, jCount = 0) {
    if (hand === "") {
        switch (type) {
            case 0: //no matches then we add the count. This falls apart when there are multiple J in a hand.
                return type + jCount;
                break;
            case 1:
                return type + jCount;
                break;
            default:
                break;
        }

        return type;
    }
    const oneChar = hand[0];
    const oneCharRegex = new RegExp(oneChar, "g");
    const results = [...hand.matchAll(oneCharRegex)];
    if (oneChar === "1") {
        jCount += results.length;
        return typer(hand.replaceAll(oneChar, ""), type);
    }
    type += cardMatches(results.length);
    return typer(hand.replaceAll(oneChar, ""), type);

}

console.log(hands);