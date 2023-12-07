const utils = require("../utils/utils");
const lines = utils.splitByLine("./Files/part1.txt");

const numsRegex = new RegExp(/\d+/gm)
const times = [...lines[0].matchAll(numsRegex)].map(subArray => subArray[0]).map(x => Number(x));
const distances = [...lines[1].matchAll(numsRegex)].map(subArray => subArray[0]).map(x => Number(x));
const successes = [];
times.forEach((time, timeIndex) => {
    let successfulTrials = 0;
    for (let index = 0; index <= time; index++) {
        const holdTime = index;
        const distance = (time - holdTime) * holdTime;
        // console.log(distance, " ", distances[index]);
        if (distance > distances[timeIndex]) {
            successfulTrials++;
        }
    }
    successes.push(successfulTrials);
})

const pt1 = successes.reduce((acc, cv) => acc * cv, 1);
console.log(pt1)

const timePt2 = Number([...lines[0].matchAll(numsRegex)].map(subArray => subArray[0]).reduce((acc, cv) => acc + cv, ""));
const distancePt2 = Number([...lines[1].matchAll(numsRegex)].map(subArray => subArray[0]).reduce((acc, cv) => acc + cv, ""));

let successfulTrialsPt2 = 0;
for (let index = 0; index <= timePt2; index++) {
    const holdTime = index;
    const distance = (timePt2 - holdTime) * holdTime;
    if (distance > distancePt2) {
        successfulTrialsPt2++;
    }
}
console.log(successfulTrialsPt2)
