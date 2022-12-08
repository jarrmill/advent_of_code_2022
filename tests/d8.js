const { isHiddenLeft, isHiddenRight, isTreeHidden } = require('../day_eight.js');
const helperElf = require('../helper_elf');

helperElf.runTest('isHiddenLeft returns false if tree is on edge', isHiddenLeft([3,4,5], 0), false);
helperElf.runTest('isHiddenLeft returns false if tree is tallest', isHiddenLeft([3,4,5,4], 2), false);
helperElf.runTest('isHiddenLeft returns true if tree is hidden', isHiddenLeft([3,4,5,4], 3), true);
helperElf.runTest('isHiddenLeft returns true if tree is hidden', isHiddenLeft([3,5,3,4], 3), true);


helperElf.runTest('isHiddenRight returns false if tree is on edge', isHiddenRight([5,3,2], 2), false);
helperElf.runTest('isHiddenRight returns false if tree is tallest', isHiddenRight([3,4,5,4], 3), false);
helperElf.runTest('isHiddenRight returns true if tree is hidden', isHiddenRight([3,6,5,8], 1), true);
helperElf.runTest('isHiddenRight returns true if tree is hidden', isHiddenRight([3,4,3,4], 1), true);

const gridOne = [
  [1, 2, 3, 4],
  [3, 2, 1, 3],
  [3, 4, 1, 2],
  [1, 3, 2, 4]
]
helperElf.runTest('isTreeHidden returns false if tree is visible', isTreeHidden(gridOne, 2, 1), false);
helperElf.runTest('isTreeHidden returns true if tree is hidden', isTreeHidden(gridOne, 1, 2),true);