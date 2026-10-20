// Return true if the integer array nums contains a complete run of consecutive integers, with each value appearing exactly once.
// The values may appear in any order. Otherwise, return false.

// More precisely, if x is the smallest value and n is the array length, the array must contain every integer from x through x + n - 1.

class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */
  isConsecutive(nums: number[]): boolean {
    const values = new Set<number>();
    let min = +Infinity;
    let max = -Infinity;
    for (let i = 0; i < nums.length; i++) {
      const curr = nums[i]!;
      if (values.has(curr)) {
        return false;
      }
      values.add(curr);
      min = Math.min(min, curr);
      max = Math.max(max, curr);
    }
    return max - min === nums.length - 1;
  }
}

new Solution().isConsecutive([6, 4, 5]);
