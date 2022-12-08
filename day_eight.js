const helperElf = require('./helper_elf');

const filename = 'd8.txt';

const solvePuzzle = function(str) {
  const grid = cleanData(str);
  let count = 0;

  grid.forEach((row, x) => {
    row.forEach((col, y) => {
      const isHidden = isTreeHidden(grid, x, y)
      if (!isHidden) {
        count += 1;
      }
    })
  })

  helperElf.log(count, 'one');

  // Part Two
  let highScore = 0;
  grid.forEach((row, x) => {
    row.forEach((col, y) => {
      const score = getTreeScore(grid, x, y)
      if (score > highScore) {
        highScore = score;
      }
    })
  });

  helperElf.log(highScore, 'two');
}

const cleanData = function(str) {
  // input: str
  // output an array of arrays to represent a matrices
  return str.split('\n').map(line => line.split(''));
}

const getCol = function(grid, i) {
  const col = grid.map((line) => line[i]);

  return col;
}

const isHiddenLeft = function(arr, i) {
  if (i === 0) return false;
  for (let j = i - 1; j >= 0; j--) {
    if (arr[j] >= arr[i]) return true;
  }

  return false;
}

const isHiddenRight = function(arr, i) {

  if (i === arr.length - 1) return false;
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[j] >= arr[i]) return true;
  }

  return false;
}

const isTreeHidden = function(grid, x, y) {
  const row = grid[x];
  const col = getCol(grid, y);

  return (isHiddenRight(row, y) && isHiddenLeft(row, y) && isHiddenRight(col, x) && isHiddenLeft(col, x))
}

// part two

const getScoreLeft = function(arr, i) {
  if (i === 0) return 0;
  let score = 0;
  for (let j = i - 1; j >= 0; j--) {
    score += 1;
    if (arr[j] >= arr[i]) return score;
  }

  return score;
}

const getScoreRight = function(arr, i) {
  if (i === arr.length - 1) return 0;
  let score = 0;
  for (let j = i + 1; j < arr.length; j++) {
    score += 1;
    if (arr[j] >= arr[i]) return score;
  }

  return score;
}

const getTreeScore = function(grid, x, y) {
  const row = grid[x];
  const col = getCol(grid, y);

  return (getScoreRight(row, y) * getScoreLeft(row, y) * getScoreRight(col, x) * getScoreLeft(col, x))
}
helperElf.readFile(filename)
  .then(solvePuzzle);

// for testing purposes
module.exports = {
  isHiddenLeft,
  isHiddenRight,
  isTreeHidden
}