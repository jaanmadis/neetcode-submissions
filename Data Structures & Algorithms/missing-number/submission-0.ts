// Given an array nums containing n integers in the range [0, n] without any duplicates,
// return the single number in the range that is missing from nums.

// You should aim for a solution with O(n) time and O(1) space, where n is the size of the input array.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  missingNumber(nums: number[]): number {
    let result = nums.length;
    // (3 xor 0 xor 1) xor (0 xor 1 xor 2 xor 3) = 2
    for (let i = 0; i < nums.length; i++) {
      result = result ^ nums[i]!;
      result = result ^ i;
    }
    return result;
  }
}

new Solution().missingNumber([3, 2, 0, 1, 4, 5, 6, 7, 9]);
