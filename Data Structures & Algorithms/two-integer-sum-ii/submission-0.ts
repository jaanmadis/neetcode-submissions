// Given an array of integers numbers that is sorted in non-decreasing order.
// Return the indices (1-indexed) of two numbers, [index1, index2],
// such that they add up to a given target number target and index1 < index2.
// Note that index1 and index2 cannot be equal, therefore you may not use the same element twice.
// There will always be exactly one valid solution.
// Your solution must use O(1).

class Solution {
  /**
   * @param {number[]} numbers
   * @param {number} target
   * @return {number[]}
   */
  twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;
    while (left < right) {
      let sum = numbers[left]! + numbers[right]!;
      if (sum === target) {
        return [left + 1, right + 1];
      } else if (sum < target) {
        left++;
      } else if (sum > target) {
        right--;
      }
    }
    return [0, 0];
  }
}

const solution = new Solution();
solution.twoSum([1, 2, 3, 4], 3);
