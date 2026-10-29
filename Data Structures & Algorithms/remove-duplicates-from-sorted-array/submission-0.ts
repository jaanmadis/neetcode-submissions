// You are given an integer array nums sorted in non-decreasing order. Your task is to remove duplicates from nums in-place so that each element appears only once.

// After removing the duplicates, return the number of unique elements, denoted as k, such that the first k elements of nums contain the unique elements.

// Note:

// The order of the unique elements should remain the same as in the original array.
// It is not necessary to consider elements beyond the first k positions of the array.
// To be accepted, the first k elements of nums must contain all the unique elements.
// Return k as the final result.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  removeDuplicates(nums: number[]): number {
    if (nums.length <= 1) {
      return nums.length;
    }
    let result = 0;
    let ptrHere = 0;
    let ptrNext = 1;
    while (ptrNext < nums.length) {
      if (nums[ptrHere]! < nums[ptrNext]!) {
        ptrHere++;
        ptrNext++;
      } else {
        ptrHere = ptrNext;
        while (true) {
          while (ptrNext < nums.length && nums[ptrHere]! >= nums[ptrNext]!) {
            ptrNext++;
          }
          if (ptrNext < nums.length) {
            nums[ptrHere] = nums[ptrNext]!;
            nums[ptrHere + 1] = nums[ptrNext]!;
            ptrHere++;
          } else {
            return ptrHere;
          }
        }
      }
    }
    return ptrNext;
  }
}

new Solution().removeDuplicates([1, 1, 1, 1, 4, 4, 5, 6]);
new Solution().removeDuplicates([1, 1, 2, 3, 4]);
new Solution().removeDuplicates([1, 2, 3, 4, 5]);
