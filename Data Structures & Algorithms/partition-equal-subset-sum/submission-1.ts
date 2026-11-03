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

    // If sum is odd, then we have no hope.
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) {
      return false;
    }

    // Get target sum.
    const target = sum / 2;

    const partition = (
      index: number,
      sum: number,
      memo: Map<number, Map<number, boolean>>,
    ): boolean => {
      // 2d memo, map in map.
      if (memo.has(index) && memo.get(index)!.has(sum)) {
        return memo.get(index)!.get(sum)!;
      }

      if (sum === target) {
        return true;
      }

      if (sum > target || index >= nums.length) {
        return false;
      }

      // Calculate partition by
      // taking value at index and moving index to next or
      // skipping value at index and moving index to next.
      const value =
        partition(index + 1, sum + nums[index]!, memo) ||
        partition(index + 1, sum, memo);

      // Memo the value.
      let subMemo = memo.get(index);
      if (!subMemo) {
        subMemo = new Map<number, boolean>();
        memo.set(index, subMemo);
      }
      subMemo.set(sum, value);

      return value;
    };

    const memo = new Map<number, Map<number, boolean>>();
    return partition(0, 0, memo);
  }
}

new Solution().canPartition([1, 2, 3, 4]);
