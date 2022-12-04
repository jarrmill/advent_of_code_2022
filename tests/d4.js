const { containsRange, overlapsRange } = require('../day_four.js');
const helperElf = require('../helper_elf');

Array.prototype.containsRange = containsRange;
Array.prototype.overlapsRange = overlapsRange;
const arrOne = [2, 8];
const arrTwo = [3, 7];
helperElf.runTest('containsRange test one', arrOne.containsRange(arrTwo), true);
helperElf.runTest('containsRange test two', arrTwo.containsRange(arrOne), false);

const arrThree = [2, 6];
const arrFour = [4, 8];
const arrFive = [2, 4];
const arrSix = [6, 8];
helperElf.runTest('overlapsRange test one', arrThree.overlapsRange(arrFour), true);
helperElf.runTest('overlapsRange test two', arrTwo.overlapsRange(arrThree), true);
helperElf.runTest('overlapsRange test three', arrFive.overlapsRange(arrSix), false);
helperElf.runTest('overlapsRange test four', arrFour.overlapsRange(arrThree), true);



