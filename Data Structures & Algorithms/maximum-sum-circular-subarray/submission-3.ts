// You are given a circular integer array nums of length n,
// return the maximum possible sum of a non-empty subarray of nums.

// A circular array means the end of the array connects to the beginning of the array.
// Formally, the next element of nums[i] is nums[(i + 1) % n] and the previous element of nums[i] is nums[(i - 1 + n) % n].

// A subarray may only include each element of the fixed buffer nums at most once.
// Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there does not exist i <= k1, k2 <= j with k1 % n == k2 % n.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  maxSubarraySumCircular(nums: number[]): number {
    let max = nums[0]!;
    let min = nums[0]!;
    let currMax = 0;
    let currMin = 0;
    let total = 0;

    for (const num of nums) {
      total += num;

      currMax = Math.max(currMax, 0);
      currMin = Math.min(currMin, 0);

      currMax += num;
      currMin += num;

      max = Math.max(max, currMax);
      min = Math.min(min, currMin);
    }

    if (total === min) {
      return max;
    }

    return Math.max(max, total - min);
  }
}

new Solution().maxSubarraySumCircular([-2, -3, -1]);
