const helperElf = require('./helper_elf');

const filename = 'd1.txt';

const getMostCalories = function(data) {
  const cleaned_data = cleanData(data);
  const summed_data = sumCalories(cleaned_data);
  helperElf.log(Math.max(...summed_data));

  // part TWO
  const sorted_data = sortSummedCalories(summed_data);
  const sum_top_three = sorted_data.slice(0, 3).reduce((a, b) => a + b);
  helperElf.log(sum_top_three, 'two');
}

const cleanData = function(data) {
  // input: string of all data
  // output: array of arrays with number of calories
  let elf_rations = data.split('\n\n');
  elf_rations = elf_rations.map((collection) => {
    const caloriesInCollection = collection.split('\n').map((numString) => Number(numString));
    return caloriesInCollection;
  });

  return elf_rations;
}

const sumCalories = function(allElfItems) {
  const summedElfItems = allElfItems.map((items) => {
    return items.reduce((a, b) => a + b);
  });

  return summedElfItems;
}

const sortSummedCalories = function(summedCalories) {
  return summedCalories.sort((a, b) => b - a );
}



helperElf.readFile(filename)
  .then(getMostCalories);