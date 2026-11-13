// You are given an integer array nums sorted in non-decreasing order,
// remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

// Since it is impossible to change the length of the array in some languages,
// you must instead have the result be placed in the first part of the array nums.
// More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result.
// It does not matter what you leave beyond the first k elements.

// Return k after placing the final result in the first k slots of nums.

// Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  removeDuplicates(nums: number[]): number {
    let k = 0;
    let x = 0;
    let weWroteThisNumber = undefined;
    let weWroteThisNumberHowManyTimes = undefined;
    for (let i = 0; i < nums.length; i++) {
      if (
        weWroteThisNumber === nums[i] &&
        weWroteThisNumberHowManyTimes === 2
      ) {
        continue;
      } else if (
        weWroteThisNumber === nums[i] &&
        weWroteThisNumberHowManyTimes === 1
      ) {
        nums[k] = nums[i]!;
        weWroteThisNumber = nums[k]!;
        weWroteThisNumberHowManyTimes = 2;
      } else if (
        weWroteThisNumber === undefined ||
        weWroteThisNumber !== nums[i]!
      ) {
        nums[k] = nums[i]!;
        weWroteThisNumber = nums[k]!;
        weWroteThisNumberHowManyTimes = 1;
      }
      console.log(`wrote ${nums[i]!} into slot ${k} | ${nums}`);
      k++;
    }
    return k;
  }
}
// new Solution().removeDuplicates([8, 8, 8, 9, 9, 9, 9, 9, 9]);

new Solution().removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]);
