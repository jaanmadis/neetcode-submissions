// You are given an array of distinct integers nums, sorted in ascending order, and an integer target.
// Implement a function to search for target within nums. If it exists, then return its index, otherwise, return -1.
// Your solution must run in O(logn) time.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let index = Math.trunc((right - left) / 2) + left;
      if (nums[index]! > target) {
        right = index - 1;
      } else if (nums[index]! < target) {
        left = index + 1;
      } else {
        return index;
      }
    }
    return -1;
  }
}

new Solution().search([-1, 0], 1);
