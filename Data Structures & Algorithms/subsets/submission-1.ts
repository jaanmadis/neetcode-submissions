// Given an array nums of unique integers, return all possible subsets of nums.

// The solution set must not contain duplicate subsets. You may return the solution in any order.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  subsets(nums: number[]): number[][] {
    // Start with empty set.
    const result: number[][] = [[]];
    for (const num of nums) {
      // Then take each number one by one.
      // And duplicate all existing subsets and add that number to each duplicate.
      // [] --> [], [3] --> [], [3], [2], [32] --> [], [3], [2], [32], [1], [31], [21], [321].
      for (let i = result.length - 1; i >= 0; i--) {
        result.push([...result[i]!, num]);
      }
    }
    return result;
  }
}

new Solution().subsets([1, 2, 3, 4]);
