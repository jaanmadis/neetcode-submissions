// Given an array nums of unique integers, return all possible subsets of nums.

// The solution set must not contain duplicate subsets. You may return the solution in any order.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  subsets(nums: number[]): number[][] {
    const result: number[][] = [[]];
    while (nums.length !== 0) {
      const curr = nums.pop()!;
      for (let i = result.length - 1; i >= 0; i--) {
        result.push([...result[i]!, curr]);
      }
    }
    return result;
  }
}

new Solution().subsets([1, 2, 3, 4]);
