const helperElf = require('./helper_elf');

const filename = 'd9.txt';

const solvePuzzle = function(data) {
  const commands = cleanData(data);
  let headLocation = [0, 0];
  let tailLocation = [0, 0];

  const tailSpacesVisited = new Set();
  tailSpacesVisited.add(getTailStr(tailLocation));

  commands.forEach(command => {
    headLocation = moveHead(command, headLocation);
    tailLocation = moveTail(headLocation, tailLocation);
    const tailStr = getTailStr(tailLocation);
    tailSpacesVisited.add(tailStr);
  });

  helperElf.log(tailSpacesVisited.size);

  // const part two
  const tSet = new Set();
  const tHistory = [];
  let h = [0, 0];
  let r1 = [0,0];
  let r2 = [0,0];
  let r3 = [0,0];
  let r4 = [0,0];
  let r5 = [0,0];
  let r6 = [0,0];
  let r7 = [0,0];
  let r8 = [0,0];
  let t  = [0,0];
  tSet.add(getTailStr(t));
  commands.forEach(command => {
    h = moveHead(command, h);
    r1 = moveTail(h, r1);
    r2 = moveTail(r1, r2);
    r3 = moveTail(r2, r3);
    r4 = moveTail(r3, r4);
    r5 = moveTail(r4, r5);
    r6 = moveTail(r5, r6);
    r7 = moveTail(r6, r7);
    r8 = moveTail(r7, r8);
    t = moveTail(r8, t);

    const tStr = getTailStr(t);
    tSet.add(tStr);
    tHistory.push(tStr);
    console.log(tHistory);
  });
  helperElf.log(tSet.size, 'two');
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

const moveHead = function(direction, headLocation) {
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

  return results = [tailY, tailX];
}

const getTailStr = function(tailLocation) {
  return tailLocation[0].toString() + tailLocation[1].toString();
}

helperElf.readFile(filename)
  .then(solvePuzzle);