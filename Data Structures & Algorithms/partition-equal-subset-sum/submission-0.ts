// You are given an array of positive integers nums.

// Return true if you can partition the array into two subsets, subset1 and subset2 where sum(subset1) == sum(subset2). Otherwise, return false.

class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */
  canPartition(nums: number[]): boolean {
    if (nums.length === 0) {
      return false;
    }

    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) {
      return false;
    }

    const target = sum / 2;

    const partition = (index: number, sum: number): boolean => {
      if (sum === target) {
        return true;
      }
      if (sum > target || index >= nums.length) {
        return false;
      }
      return (
        partition(index + 1, sum + nums[index]!) || partition(index + 1, sum)
      );
    };

    return partition(0, 0);
  }
}

new Solution().canPartition([1, 2, 3, 4]);
