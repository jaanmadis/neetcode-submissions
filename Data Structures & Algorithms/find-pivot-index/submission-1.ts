// You are given an array of integers nums, calculate the pivot index of this array.
// The pivot index is the index where the sum of all the numbers strictly to the left of the index
// is equal to the sum of all the numbers strictly to the index's right.
// If the index is on the left edge of the array,
// then the left sum is 0 because there are no elements to the left.
// This also applies to the right edge of the array.
// Return the leftmost pivot index. If no such index exists, return -1.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  pivotIndex(nums: number[]): number {
    const total = nums.reduce((a, b) => a + b);
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
      let right = total - left - nums[i]!;
      if (left === right) {
        return i;
      }
      left += nums[i]!;
    }
    return -1
  }
}

new Solution().pivotIndex([-1, -1, -1, 0, 1, 1]);
new Solution().pivotIndex([3, 2, 1]);
new Solution().pivotIndex([2, 1, -1]);
new Solution().pivotIndex([1, 7, 3, 6, 5, 6]);
