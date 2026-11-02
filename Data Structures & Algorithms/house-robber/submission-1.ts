// You are given an integer array nums where nums[i] represents the amount of money the ith house has.
// The houses are arranged in a straight line, i.e. the ith house is the neighbor of the (i-1)th and (i+1)th house.

// You are planning to rob money from the houses,
// but you cannot rob two adjacent houses because the security system will
// automatically alert the police if two adjacent houses were both broken into.

// Return the maximum amount of money you can rob without alerting the police.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  rob(nums: number[]): number {
    const robHouse = (i: number, cache: Map<number, number>): number => {
      if (cache.has(i)) {
        return cache.get(i)!;
      }

      if (i >= nums.length) {
        return 0;
      }

      if (i === nums.length - 1) {
        const value = nums[i]!;
        cache.set(i, value);
        return value;
      }

      if (i === nums.length - 2) {
        const value = Math.max(nums[i]!, nums[i + 1]!);
        cache.set(i, value);
        return value;
      }

      const robThis = nums[i]! + robHouse(i + 2, cache);
      const robNext = nums[i + 1]! + robHouse(i + 3, cache);

      const value = Math.max(robThis, robNext);
      cache.set(i, value);
      
      return value;
    };

    return robHouse(0, new Map<number, number>());
  }
}

new Solution().rob([1, 1, 31, 3]);
