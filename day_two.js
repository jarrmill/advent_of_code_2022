const helperElf = require('./helper_elf');

const filename = 'd2.txt';

const calculateScore = function (fileString) {
  const data = cleanData(fileString);
  const roundScores = data.map(calculateRoundScore);
  const sumRoundScores = roundScores.reduce((a, b) => a + b);
  helperElf.log(sumRoundScores, 'one');

  const thrownRoundScores = data.map(throwRound);
  const sumThrownRoundScores = thrownRoundScores.reduce((a, b) => a + b);
  helperElf.log(sumThrownRoundScores, 'two');
};

const cleanData = function (fileString) {
  // input:  string of inputs
  // output: array of tuples
  const pairs = fileString.split('\n');
  return pairs.map(pair => pair.split(' '));
};

const calculateWinner = function(rpsTuple) {
  const [elfPlay, yourPlay] = rpsTuple;
  const winningDict = {
    'X':'C',
    'Y':'A',
    'Z':'B',
  }
  const drawDict = {
    'X':'A',
    'Y':'B',
    'Z':'C'
  }

  if (winningDict[yourPlay] === elfPlay) return 6;
  if (drawDict[yourPlay] === elfPlay) return 3;
  return 0;
};

const calculateChoicePoints = function(choice) {
  const points = {
    'X': 1,
    'Y': 2,
    'Z': 3
  }

  return points[choice];
};

const calculateRoundScore = function(rpsTuple) {
  return calculateWinner(rpsTuple) + calculateChoicePoints(rpsTuple[1]);
}

// Part Two
const xyzDict = {
  'X': 0,
  'Y': 3,
  'Z': 6
}

const abcDict = {
  'A': 1,
  'B': 2,
  'C': 3
}

const throwRound = function(rpsTuple) {
  const [elfPlay, outcome] = rpsTuple;
  const choices = ['X', 'Y', 'Z'];

  const correctChoice = choices.filter(choice => {
    return xyzDict[outcome] === calculateWinner([elfPlay, choice]);
  })[0];

  return xyzDict[outcome] + calculateChoicePoints(correctChoice);
}

helperElf.readFile(filename)
  .then(calculateScore);