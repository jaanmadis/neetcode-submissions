// Given an array of integers nums, find the subarray with the largest sum and return the sum.

// A subarray is a contiguous non-empty sequence of elements within an array.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  // Kadane's algorithm
  maxSubArray(nums: number[]): number {
    let maxSum = nums[0] ?? 0;
    let curSum = 0;
    for (const num of nums) {
      curSum = Math.max(curSum, 0);
      curSum += num;
      maxSum = Math.max(maxSum, curSum);
    }
    return maxSum;
  }
}

new Solution().maxSubArray([2, -3, 4, -2, 2, 1, -1, 4]);
