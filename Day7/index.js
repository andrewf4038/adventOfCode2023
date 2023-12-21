const { fork } = require("child_process");
const utils = require("../utils/utils");
const { ifError } = require("assert");
const lines = utils.splitByLine("./Files/part1.txt");
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

console.log(pt1Result)

// PT 2
hands2 = [...hands];
hands2.forEach(hand => { // Start by getting the card order with the replace corrected where J is the lowest.
    hand.hand = hand.hand.replaceAll("C", "1")
    hand.type = typer2(hand.hand);
})

function typer2(hand, type = 0, jCount = 0) {
    if (hand === "") {
        switch (jCount) {
            case 0: //no jokers, type is unchanged
                return type;
                break;
            // high(0), one pair (1), two pair (2), three of a kind (3), full house(4), four of a kind(5), five of a kind (6)
            case 1: // one joker. 0-1, 1->3, 2->4, 3->5, 5->6
                if (type === 0 || type === 5) {
                    return type + 1;
                    break;
                } else {
                    return type + 2;
                    break;
                }
            case 2: // two jokers. 0->3, 1->5, 3->6
                if (type === 1) {
                    return type + 4;
                    break;
                } else {
                    return type + 3;
                    break

                }
            case 3: // three jokers. 0->5, 1->6
                return type + 5;
                break;
            case 4: // four jokers. 0->6
                return 6;
                break;
            case 5: //five jokers. 0->6
                return 6;
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
        return typer2(hand.replaceAll(oneChar, ""), type, jCount);
    }
    type += cardMatches(results.length);
    return typer2(hand.replaceAll(oneChar, ""), type, jCount);
}

const orderedHands2 = [...hands2];
orderedHands2.sort(sortHands)

let pt2Result = 0;
orderedHands2.forEach((hand, index) => {
    pt2Result += hand.bid * (index + 1);
})

console.log(pt2Result)