const helperElf = require('./helper_elf');

const filename = 'd5.txt';
const columnLength = 9;

const solvePuzzle = function(data) {
  let { top: stacks, bottom : orders } = cleanData(data);
  // COMMENTING OUT FIRST PART BECAUSE IT ISN'T CLEAN EVEN THOUGH I DON'T GET HOW???
  // IT ALTERS THE `stacks` OBJECT (WTF)

  // let newStacks = stacks.slice();
  // orders.forEach(order => {
  //   console.log('Executing order: ', order);
  //   newStacks = executeOrder(order, newStacks);
  // });

  // const topStacks = getTopStacks(newStacks);
  // helperElf.log(topStacks, 'one');

  // partTwo
  let partTwoStacks = stacks.slice();
  orders.forEach(order => {
    partTwoStacks = executeOrder9001(order, partTwoStacks);
  });
  const partTwoTopStacks = getTopStacks(partTwoStacks);
  helperElf.log(partTwoTopStacks, 'two');
}

const cleanData = function(data) {
  let [topData, bottomData] = data.split('\n\n');
  const top = cleanTop(topData);
  const bottom = cleanBottom(bottomData); // lol
  return { top, bottom }
};

const cleanTop = function(topData) {
  let top = topData.split('\n').filter((line) => !line.includes('1'));
  top = top.map(line => {
    // split string on every 4th char (i.e. the spaces seperating the rows)
    let rows = line.match(/.{1,4}/g);
    rows = rows.map(col => col.split('').filter(char => char.match(/[a-z]/i)));

    return rows;
  });

  let stacks = [];
  for (let i = 0; i < columnLength; i++) {
    const stack = [];
    top.forEach((row) => stack.push(row[i]));
    stacks.push(stack.reverse().flat());
  }
  return stacks;
}

const cleanBottom = function(bottomData) {
  let bottom = bottomData.split('\n').map(line => line.split(' '));
  bottom = bottom.map((line) => {
    return {
      amt: Number(line[1]),
      from: line[3] - 1,
      to: line[5] - 1
    }
  })
  return bottom;
}

const executeOrder = function(order, stacks) {
  const stacksCopy = stacks.slice();
  for (let i = 0; i < order.amt; i++) {
    const crate = stacksCopy[order.from].pop();
    stacksCopy[order.to].push(crate);
  }
  return stacksCopy
}

const getTopStacks = function(stacks) {
  const results = [];
  stacks.forEach(stack => {
    results.push(stack[stack.length - 1]);
  })

  return results.join('');
}

// part two

const executeOrder9001 = function(order, stacks) {
  const stacksCopy = stacks.slice();
  let crates = [];
  for (let i = 0; i < order.amt; i++) {
    crates.push(stacksCopy[order.from].pop());
  }
  stacksCopy[order.to] = stacksCopy[order.to].concat(crates.reverse());
  return stacksCopy
}

helperElf.readFile(filename)
  .then(solvePuzzle);
