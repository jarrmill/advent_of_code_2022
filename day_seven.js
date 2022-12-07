const helperElf = require('./helper_elf');

const filename = 'd7.txt';

const solvePuzzle = function(data) {
  const directory = cleanData(data);

  // part one;
  const solution = directory.getSumByFilter((child) => child.size <= 100000);
  helperElf.log(solution, 'one');

  // part two;
  const recommendation = directory.findDeleteSuggestion(70000000, 30000000);
  helperElf.log(recommendation.size, 'two');
};

const cleanData = function(data) {
  const commands = data.split('\n').slice(1);
  const directory = new Directory();
  let branch = directory;
  commands.forEach(command => {
    const argv = command.split(' ');
    if (argv.includes('ls')) {
      return;
    }
    if (argv.includes('cd')) {
      branch = branch.cd(argv[2]);
    }
    if (argv.includes('dir')) {
      branch.mkDir(argv[1]);
    }
    if (Number(argv[0])) {
      branch.touch(argv[1], Number(argv[0]));
    }
  });
  directory.calculateSize();
  directory.flattenTreeBySize();

  return directory;
};

class Directory {
  constructor(parent, name = '/', size) {
    this.parent = parent;
    this.children = [];
    this.size = size || 0;
    this.isFile = !!size;
    this.name = name;

    this.partOneSolution = 0;
    this.partTwoSolution = {};
  }

  cd(path) {
    if (path === '..') {
      return this.parent;
    } else {
      return this.children.find((child) => child.name === path);
    }
  }

  mkDir(name) {
    const dir = new Directory(this, name);
    this.children.push(dir);
  }

  touch(fileName, fileSize) {
    const file = new Directory(this, fileName, fileSize);
    this.children.push(file);
  }

  calculateSize() {
    if (this.isFile) return this.size;

    this.children.forEach(child => {
      this.size += child.calculateSize();
    })

    return this.size;
  }

  // Part One Answer
  getSumByFilter(filterFunc) {
    if (this.isFile || this.name === '/n') return 0;

    this.children.forEach(child => {
      if (filterFunc(child) && !child.isFile) {
        this.partOneSolution += child.size;
      }
      this.partOneSolution += child.getSumByFilter(filterFunc)
    });
    return this.partOneSolution;
  }

  // Part Two Answer
  flattenTreeBySize() {
    this.children.forEach(child => {
      if (child.isFile) return;
      this.partTwoSolution[child.name] = child.size;
      this.partTwoSolution = {...this.partTwoSolution, ...child.flattenTreeBySize()};
    })
    return this.partTwoSolution;
  }

  findDeleteSuggestion(spaceAvailable, updateSize) {
    const spaceNeeded = Math.abs(spaceAvailable - this.size - updateSize);
    const smallestOption = { name: '', size: spaceAvailable };
    Object.keys(this.partTwoSolution).forEach(key => {
      const folderSize = this.partTwoSolution[key];
      if (folderSize >= spaceNeeded) {
        if (folderSize < smallestOption.size) {
          smallestOption.name = key;
          smallestOption.size = folderSize; 
        }
      }
    });

    return smallestOption;
  }
}

helperElf.readFile(filename)
  .then(solvePuzzle);