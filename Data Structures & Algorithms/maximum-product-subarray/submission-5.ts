// Given an integer array nums, find a subarray that has the largest product, and return the product.

// A subarray is a contiguous non-empty sequence of elements within an array.

// You can assume the output will fit into a 32-bit integer.

// Note that the product of an array with a single element is the value of that element.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  maxProduct(nums: number[]): number {
    let result = nums[0];

    // console.log(nums);

    const dp = new Array(nums.length).fill({ min: 0, max: 0 });
    dp[0] = { min: nums[0], max: nums[0] };

    for (let i = 1; i < nums.length; i++) {
      const num = nums[i]!;
      if (num > 0) {
        dp[i] = {
          min: Math.min(dp[i - 1].min * num, num),
          max: Math.max(dp[i - 1].max * num, num),
        };
      } else if (num < 0) {
        dp[i] = {
          min: Math.min(dp[i - 1].max * num, num),
          max: Math.max(dp[i - 1].min * num, num),
        };
      }
      result = Math.max(result, dp[i].max);
    }

    // dp.forEach((entry) => console.log(entry));

    return result;
  }
}

new Solution().maxProduct([2, 4, -3, 5]);
