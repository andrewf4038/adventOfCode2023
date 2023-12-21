const { dir } = require("console");
const utils = require("../utils/utils");
const blocks = utils.splitByBlock("./Files/part1_test.txt");
const directions = blocks[0];
const nodes = blocks[1].split('\n');

//Read the directions
// iterate over nodes the length of the directions
// keep count of number of times through or steps
// if final result is ZZZ, end and dump final number
// if not, run through again


