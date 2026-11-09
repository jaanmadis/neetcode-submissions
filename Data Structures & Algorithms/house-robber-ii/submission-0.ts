// You are given an integer array nums where nums[i] represents the amount of money the ith house has.
// The houses are arranged in a circle, i.e. the first house and the last house are neighbors.

// You are planning to rob money from the houses,
// but you cannot rob two adjacent houses because the security system will automatically alert the police if two adjacent houses were both broken into.

// Return the maximum amount of money you can rob without alerting the police.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  rob(nums: number[]): number {
    const memo = new Map<string, number>();

    const robHouse = (index: number, robbedFirst: boolean): number => {
      if (index >= nums.length) {
        return 0;
      }

      const key = `${index}-${robbedFirst}`;

      if (memo.has(key)) {
        return memo.get(key)!;
      }

      const take =
        index === nums.length - 1 && robbedFirst
          ? 0
          : nums[index]! + robHouse(index + 2, robbedFirst || index === 0);
      const skip = robHouse(index + 1, robbedFirst);

      const result = Math.max(take, skip);

      memo.set(key, result);

      return result;
    };

    return robHouse(0, false);
  }
}

new Solution().rob([2, 9, 8, 3, 6]);
