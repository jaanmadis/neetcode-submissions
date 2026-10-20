// Given an array nums of size n, return the majority element.

// The majority element is the element that appears more than ⌊n / 2⌋ times in the array.
// You may assume that the majority element always exists in the array.

// Could you solve the problem in linear time and in O(1) space?

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  majorityElement(nums: number[]): number | null {
    if (nums.length === 0) {
      return null;
    }
    let count = 1;
    let result = nums[0]!;
    for (let i = 1; i < nums.length; i++) {
      if (count === 0) {
        result = nums[i]!;
        count = 1;
      } else if (nums[i] !== result) {
        count--;
      } else if (nums[i] === result) {
        count++;
        if (count > nums.length / 2) {
          return result;
        }
      }
    }
    return result;
  }
}

new Solution().majorityElement([
  3, 4, 7, 8, 5, 5, 1, 1, 1, 5, 5, 5, 5, 5, 5, 1, 2,
]);
