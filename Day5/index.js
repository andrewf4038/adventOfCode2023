const utils = require("../utils/utils");
const blocks = utils.splitByBlock("./Files/part1_test.txt");

function createMap(block) {
    const arr = [];
    block.forEach(item => {
        const mapping = [...item.matchAll(numsRegex)].map(subArray => subArray[0]).map(x => Number(x))
        if (mapping.length > 0) {
            arr.push(mapping);
        }
    })
    return arr;
}

const numsRegex = new RegExp(/\d+/gm)
// const seeds = [...blocks[0].matchAll(numsRegex)];
const seeds = createMap(blocks[0].split("\n")).flat();
const seedToSoilMap = createMap(blocks[1].split("\n"));
const soilToFertilizerMap = createMap(blocks[2].split("\n"));
const fertilizerToWaterMap = createMap(blocks[3].split("\n"));
const waterToLightMap = createMap(blocks[4].split("\n"));
const lightToTemperatureMap = createMap(blocks[5].split("\n"));
const temperatureToHumidityMap = createMap(blocks[6].split("\n"));
const humidityToLocationMap = createMap(blocks[7].split("\n"));

// console.log(seedToSoilMap)
// console.log(soilToFertilizerMap)

function mapValue(value, map) {
    let mappedValue = value; //98
    map.forEach(line => {
        if (value >= line[1] && value < line[1] + line[2]) {
            mappedValue = value - (line[1] - line[0]);
        }
    })
    return mappedValue;
}

const seedToSoil = []

function allStepper(inputArr, map) {
    const returnArr = []
    inputArr.forEach(item => {
        returnArr.push(mapValue(item, map));
    })
    return returnArr;
}
const soil = allStepper(seeds, seedToSoilMap);
const fertilizer = allStepper(soil, soilToFertilizerMap);
const water = allStepper(fertilizer, fertilizerToWaterMap);
const light = allStepper(water, waterToLightMap);
const temperature = allStepper(light, lightToTemperatureMap);
const humidity = allStepper(temperature, temperatureToHumidityMap);
const location = allStepper(humidity, humidityToLocationMap);

// console.log(Math.min(...location))


// console.log(seeds)

const seedRanges = seeds.reduce((result, item, index) => {
    if (index % 2 === 0) {
        result.push([item]);
    } else {
        result[result.length - 1].push(item + Number(result[result.length - 1]) - 1);
    }
    return result;
}, []);
//Pt 2----------------------------------------------------------------------------------------------------------
const seedRangesPt2 = [[79, 92], [55, 67]];

const ranges = [[69, 69], [0, 54]];

function findIntersection(range1, range2) { //helper function
    const minIntersection = Math.max(range1[0], range2[0]);
    const maxIntersection = Math.min(range1[1], range2[1]);

    if (minIntersection <= maxIntersection) {
        return [minIntersection, maxIntersection];
    } else {
        return null; // No intersection
    }
}

function splitFunction(rangeToSplit, intersection) { //helper function
    const arr = [];
    if (intersection[0] > rangeToSplit[0] && intersection[1] < rangeToSplit[1]) {
        arr.push([rangeToSplit[0], intersection[0] - 1], intersection, [intersection[1] + 1, rangeToSplit[1]]);
    } else if (intersection[0] > rangeToSplit[0]) {
        arr.push([rangeToSplit[0], intersection[0] - 1], intersection);
    } else if (intersection[1] < rangeToSplit[1]) {
        arr.push(intersection, [intersection[1] + 1, rangeToSplit[1]])
    } else arr.push(intersection)
    return arr;
}

function findSplitMapRange(range, map) { //Breaks out the segments to reverse further
    let splitFoundRange;
    map.forEach(transform => {
        const intersectionRange = findIntersection(range, [transform[1], transform[1] + transform[2] - 1]);
        if (intersectionRange) {
            splitFoundRange = splitFunction(range, intersectionRange);
        }
    })
    return splitFoundRange;
}

function rangeTransformer(splitRange, map) { // reverses it up the chain to find the next values
    splitRange.forEach((range, rangeIndex) => {
        map.forEach(transform => {
            const intersectionRange = findIntersection(range, [transform[0], transform[0] + transform[2] - 1]);
            if (intersectionRange) {
                const min = splitRange[rangeIndex][0];
                const max = splitRange[rangeIndex][1];
                const change = transform[1] - transform[0];
                splitRange[rangeIndex] = [min - change, max - change];
            }
        })
    })
    return splitRange;

}

function combinedReverser(ranges, map) { //combining my two primary functions into one to speed up next steps
    const reversedRange = findReverseMapRanges(ranges, map);
    const newRange = reverser(reversedRange, map);
    return newRange;
}

const seedsPt2 = [79, 92];
const soilPt2 = rangeTransformer(findSplitMapRange(seedsPt2, seedToSoilMap), seedToSoilMap);
console.log(soilPt2)
const fPt2 = rangeTransformer(findSplitMapRange([[81, 94]], soilToFertilizerMap), soilToFertilizerMap)
console.log(findSplitMapRange(soilPt2, soilToFertilizerMap))
// console.log(soilPt2)
// console.log(findSplitMapRange(soilPt2, soilToFertilizerMap))
// console.log(fPt2)
// const wPt2 = rangeTransformer(findSplitMapRange(fPt2, fertilizerToWaterMap), fertilizerToWaterMap)
// const lightPt2 = rangeTransformer(findSplitMapRange(wPt2, waterToLightMap), waterToLightMap)
// const tPt2 = rangeTransformer(findSplitMapRange(lightPt2, lightToTemperatureMap), lightToTemperatureMap)
// const hPt2 = rangeTransformer(findSplitMapRange(tPt2, temperatureToHumidityMap), temperatureToHumidityMap)
// const locPt2 = rangeTransformer(findSplitMapRange(hPt2, humidityToLocationMap), humidityToLocationMap)
// console.log(locPt2);


// I want to take the range that I have and see if it intersects with any of the transformations
// If it does I will take the original and divide it up into intersection values. I pass the intersection through the reverse transformation.
// THroughout this, I ensure I keep track of the original order by where I insert the values. 
// This is because at the end of this, I will look at the ranges and which ones then intersect with the seed ranges and the lowest one in the first order will be the seed I want.
// I continue to check the remaining sections if they also have an intersection with any of the other values, as I find the intersections, I pass them through that reverse transformation
// Once I have completed all the ranges for the transformations, I return that new set of ranges.   