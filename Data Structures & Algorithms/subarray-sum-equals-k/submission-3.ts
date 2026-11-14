// You are given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

// A subarray is a contiguous non-empty sequence of elements within an array.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number}
   */
  subarraySum(nums: number[], k: number): number {
    let sum = 0;
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
      sum += nums[i]!;
      if (sum === k) {
        result++;
      }

      let sum2 = sum;
      for (let j = 0; j < i; j++) {
        sum2 -= nums[j]!;
        if (sum2 === k) {
          result++;
        }
      }
    }
    return result;
  }
}

new Solution().subarraySum([0, 0, 0], 0);
new Solution().subarraySum([2, -1, 1, 2], 2);
new Solution().subarraySum([0, 0, 0, 0, 0], 0);
new Solution().subarraySum([1, -1, 0], 0);
new Solution().subarraySum([4, 4, 4, 4, 4, 4], 4);
