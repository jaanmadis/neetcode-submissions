// You are given a binary array nums, return the maximum number of consecutive 1's in the array.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  findMaxConsecutiveOnes(nums: number[]): number {
    let best = 0;
    let curr = 0;
    // Single pass, keep track of current streak, keep track of best streak.
    for (let num of nums) {
      if (num === 1) {
        curr++;
        best = Math.max(best, curr);
      } else {
        curr = 0;
      }
    }
    return best;
  }
}
