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
  robHouses(nums: number[]): number {
    const dp = new Array(nums.length).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0]!, nums[1]!);

    for (let i = 2; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }

    return dp[dp.length - 1];
  }

  rob(nums: number[]): number {
    if (nums.length === 0) {
      return 0;
    }
    if (nums.length === 1) {
      return nums[0]!;
    }
    if (nums.length === 2) {
      return Math.max(nums[0]!, nums[1]!);
    }

    const robWoFirst = this.robHouses(nums.slice(1));
    const robWoLast = this.robHouses(nums.slice(0, -1));

    return Math.max(robWoFirst, robWoLast);
  }

  robMemo(nums: number[]): number {
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

new Solution().rob([1]);
