const helperElf = require('./helper_elf');

const filename = 'd3.txt';

const solvePuzzle = function(data) {
  const rucksacks = cleanData(data);
  const duplicateLetters = rucksacks.map(returnDuplicateLetters).flat();
  const points = pointLetters(duplicateLetters);
  const pointSum = points.reduce((a, b) => a + b);
  helperElf.log(pointSum, 'one');

  // part two
  const badges = calculateBadges(rucksacks.map(rejoinRucksack)).flat();
  const badgePoints = pointLetters(badges);
  const badgeSum = badgePoints.reduce((a, b) => a + b);
  helperElf.log(badgeSum, 'two');
}

const cleanData = function(data) {
  // input: text file with each line representing a rucksack
  // output: an array of tuples, with each tuple representing one half of the rucksack. evenly split
  const lines = data.split('\n');
  const rucksacks = lines.map((line) => {
    const first = line.slice(0, (line.length / 2));
    const second = line.slice((line.length / 2));

    return [first, second];
  });

  return rucksacks;
};

const returnDuplicateLetters = function(rucksackArr) {
  // output: an array of duplicate letters found in all elements of rucksackArr
  // note: array of duplicate letters does not contain any duplicates itself
  const letterDict = {};
  const results = {};
  // const [first, second] = rucksackTuple;

  // first.split('').forEach(letter => {
  //   letterDict[letter] = true;
  // });

  // second.split('').forEach(letter => {
  //   if (letterDict[letter]) {
  //     results[letter] = true;
  //   }
  // })
  rucksackArr.forEach((str, i) => {
    const isFinal = rucksackArr.length === i + 1;
    if (!isFinal) {
      str.split('').forEach(letter => {
        letterDict[letter] = true;
      })
    } else {
      str.split('').forEach(letter => {
        if (letterDict[letter]) {
          results[letter] = true;
        }
      })
    }
  })

  return Object.keys(results);
}

const rejoinRucksack = function(rucksackTuple) {
  return rucksackTuple.join('');
}

const pointLetters = function(duplicateLetters) {
  const results = duplicateLetters.map((letter) => {
    const charCode = letter.charCodeAt(0);

    return charCode >= 97 ? charCode - 96 :  charCode - 38; 
  })

  return results;
};

const calculateBadges = function(rucksacks) {
  const copy = rucksacks.slice();
  const results = [];
  while (copy.length) {
    const batchOfThree = copy.splice(0, 3);
    const dupeAnB = returnDuplicateLetters([batchOfThree[0], batchOfThree[1]]);
    const dupeAnC = returnDuplicateLetters([batchOfThree[0], batchOfThree[2]]);
    const dupeBnC = returnDuplicateLetters([batchOfThree[1], batchOfThree[2]]);
    const badge = returnDuplicateLetters([dupeAnB.join(''), dupeAnC.join(''), dupeBnC.join('')]);
    results.push(badge);
  };

  return results;
}


helperElf.readFile(filename)
  .then(solvePuzzle);