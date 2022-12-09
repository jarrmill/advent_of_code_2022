const helperElf = require('./helper_elf');

const filename = 'd9.txt';

const solvePuzzle = function(data) {
  const commands = cleanData(data);
  const height = 4;
  const width = 5;
  let headLocation = [height, 0];
  let tailLocation = [height, 0];
  // const board = initializeBoard(height, width);
  // console.log(board);
  const tailSpacesVisited = new Set();
  tailSpacesVisited.add(getTailStr(tailLocation));
  const tailHistory = [getTailStr(tailLocation)];
  commands.forEach(command => {
    headLocation = moveHead(command, height, width, headLocation);
    tailLocation = moveTail(headLocation, tailLocation);
    const tailStr = getTailStr(tailLocation);
    tailHistory.push(tailStr);
    tailSpacesVisited.add(tailStr);
    // console.log('Command: ', command);
    // console.log('Head location: ', headLocation);
    // console.log('Tail Location: ', tailLocation);
    // console.log(' ---- ');
  });
  // console.log('Tail spaces visited: ', tailSpacesVisited.size);
  helperElf.log(tailSpacesVisited.size);
}

const cleanData = function(data) {
  const commands = [];
  data.split('\n').forEach((line) => {
    const [dir, num] = line.split(' ');
    for (let i = 1; i <= Number(num); i++) {
      commands.push(dir);
    }
  });
  return commands;
}

const initializeBoard = function(height, length) {
  const board = [];

  for (let i = 0; i < height + 1; i++) {
    board.push(new Array(length));
  }
  
  return board;
}

const moveHead = function(direction, height, width, headLocation) {
  // output: new coords
  let [y, x] = headLocation
  switch(direction) {
    case 'U':
      y -= 1
      break; 
    case 'R':
      x += 1
      break;
    case 'D':
      y += 1
      break;
    case 'L':
      x -= 1
      break;
    default:
      break;
  }
  return [y, x];
}

const moveTail = function(headLocation, tailLocation) {
  let [headY, headX] = headLocation;
  let [tailY, tailX] = tailLocation;
  let yDiff = headY - tailY;
  let xDiff = headX - tailX;

  if (yDiff > 1) {
    tailY += 1;
    if (xDiff !== 0) {
      tailX = headX;
      xDiff = 0;
    }
  }
  if (yDiff < -1) {
    tailY -= 1;
    if (xDiff !== 0) {
      tailX = headX;
      xDiff = 0;
    }
  }
  if (xDiff > 1) {
    tailX += 1;
    if (yDiff !== 0) {
      tailY = headY;
      yDiff = 0;
    }
  }
  if (xDiff < -1) {
    tailX -= 1;
    if (yDiff !== 0) {
      tailY = headY;
      yDiff = 0;
    } 
  }

  return [tailY, tailX];
}

const getTailStr = function(tailLocation) {
  return tailLocation[0].toString() + tailLocation[1].toString();
}

helperElf.readFile(filename)
  .then(solvePuzzle);