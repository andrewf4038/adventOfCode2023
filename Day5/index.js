const utils = require("../utils/utils");
const blocks = utils.splitByBlock("./Files/part1.txt");

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
// console.log(seeds);
// console.log(soil);
// console.log(fertilizer);
// console.log(water);
// console.log(light);
// console.log(temperature);
// console.log(humidity);
// console.log(location);

console.log(Math.min(...location))

