// You are given an array of positive integers nums and a positive integer target,
// return the minimal length of a subarray whose sum is greater than or equal to target.
// If there is no such subarray, return 0 instead.
// A subarray is a contiguous non-empty sequence of elements within an array.

class Solution {
  /**
   * @param {number} target
   * @param {number[]} nums
   * @return {number}
   */
  minSubArrayLen(target: number, nums: number[]): number {
    let result = Infinity;
    let left = 0;
    let right = 0;
    let sum = 0;

    while (left < nums.length) {
      while (sum < target && right < nums.length) {
        sum += nums[right]!;
        right++;
        if (sum >= target) {
          result = Math.min(result, right - left);
          break;
        }
      }
      sum -= nums[left]!;
      left++;
      if (sum >= target) {
        result = Math.min(result, right - left);
      }
    }

    return result === Infinity ? 0 : result;
  }
}

new Solution().minSubArrayLen(10, [2, 1, 5, 1, 5, 3]);
