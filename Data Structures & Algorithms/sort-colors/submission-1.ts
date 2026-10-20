// You are given an array nums consisting of n elements where each element is an integer representing a color:

// 0 represents red
// 1 represents white
// 2 represents blue

// Your task is to sort the array in-place such that elements of the same color are grouped together and arranged in the order:
// red (0), white (1), and then blue (2).

// You must not use any built-in sorting functions to solve this problem.

// Could you come up with a one-pass algorithm using only constant extra space?

class Solution {
  /**
   * @param {number[]} nums
   * @return {void} Do not return anything, modify nums in-place instead.
   */
  sortColors(nums: number[]): void {
    const bucket: number[] = new Array(3).fill(0);
    for (let i = 0; i < nums.length; i++) {
      bucket[nums[i]!]!++;
    }
    let bucketPtr = 0;
    for (let i = 0; i < nums.length; i++) {
      while (bucket[bucketPtr]! === 0) {
        bucketPtr++;
      }
      if (bucket[bucketPtr]! > 0) {
        nums[i] = bucketPtr;
        bucket[bucketPtr]!--;
      }
    }
  }
}

new Solution().sortColors([2, 0]);
