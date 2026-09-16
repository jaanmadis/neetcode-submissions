// Given an array of integers nums and an integer target,
// return the indices i and j such that nums[i] + nums[j] == target and i != j.
// You may assume that every input has exactly one pair of indices i and j that satisfy the condition.
// Return the answer with the smaller index first.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number[]}
   */
  twoSum(nums: number[], target: number): number[] {
    const map: Record<number, number> = {};
    for (let index = 0; index < nums.length; index++) {
      const num = nums[index]!;
      const diff = target - num;

      if (map[diff] !== undefined) {
        return [map[diff], index];
      }

      map[num] = index;
    }
    return [];
  }
}