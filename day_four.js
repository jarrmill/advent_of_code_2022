const helperElf = require('./helper_elf');

const filename = 'd4.txt';

const formatElfTuple = function(elf) {
  // input: '2-4'
  // output: [2, 4]
  return elf.split('-').map(numString => Number(numString))
}

const containsRange = function(arr) {
  return (arr[0] >= this[0] && arr[1] <= this[1]);
}

const overlapsRange = function(arr) {
  return ((arr[0] >= this[0] && arr[0] <= this[1]) || (arr[1] >= this[0] && arr[1] <= this[1]));
}

const solvePuzzle = function(data) {
  const sectionPairs = cleanData(data);
  Array.prototype.containsRange = containsRange;

  // Part One
  let counter = 0;
  sectionPairs.forEach((pair) => {
    const [elfOne, elfTwo] = pair;
    if (elfOne.containsRange(elfTwo) || elfTwo.containsRange(elfOne)) {
      counter += 1;
    }
  });
  helperElf.log(counter, 'one');

  // Part Two
  let overlapCounter = 0;
  sectionPairs.forEach((pair) => {
    const [elfOne, elfTwo] = pair;
    if (elfOne.overlapsRange(elfTwo) || elfTwo.overlapsRange(elfOne)) {
      overlapCounter += 1;
    }
  });
  helperElf.log(overlapCounter, 'two');

}

const cleanData = function(data) {
  const lines = data.split('\n');
  const tuples = lines.map((line) => {
    let [elfOne, elfTwo] = line.split(',');

    return [formatElfTuple(elfOne), formatElfTuple(elfTwo)];
  })
  return tuples;
};

helperElf.readFile(filename)
  .then(solvePuzzle);

// for testing purposes
module.exports = {
  containsRange,
  overlapsRange
}