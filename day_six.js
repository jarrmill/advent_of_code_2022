const helperElf = require('./helper_elf');

const filename = 'd6.txt';

const solvePuzzle = function(str) {
  const partOneSolution = getRightBound(str, 4);
  helperElf.log(partOneSolution, 'one');

  const partTwoSolution = getRightBound(str, 14);
  helperElf.log(partTwoSolution, 'two');
}

const getRightBound = function(str, uniqueStrLength) {
  let left = 0;
  let right = 0;

  for (let i = 0; i < str.length; i++) {
    if (right - left !== uniqueStrLength) {
      right += 1;
      continue;
    } else {
      const slice = str.slice(left, right);
      if (!containsDupes(slice)) {
        return right;
      }
      left += 1;
      right += 1;
    }
  }
}

const containsDupes = function(str) {
  const record = {}
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (record[char]) {
      return true;
    } else {
      record[char] = true;
    }
  }

  return false;
}
helperElf.readFile(filename)
  .then(solvePuzzle);