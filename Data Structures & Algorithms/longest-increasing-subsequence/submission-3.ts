// Given an integer array nums, return the length of the longest strictly increasing subsequence.

// A subsequence is a sequence that can be derived from the given sequence by
// deleting some or no elements without changing the relative order of the remaining characters.

// For example, "cat" is a subsequence of "crabt".

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  lengthOfLIS(nums: number[]): number {
    const process = (
      index: number,
      largest: number,
      cache: Map<string, number>,
    ): number => {
      const key = `${index}-${largest}`;
      if (cache.has(key)) {
        return cache.get(key)!;
      }

      if (index >= nums.length) {
        return 0;
      }

      const skip = process(index + 1, largest, cache) + 0;
      let value = skip;

      if (nums[index]! > largest) {
        const take = process(index + 1, nums[index]!, cache) + 1;
        value = Math.max(skip, take);
      }

      cache.set(key, value);
      return value;
    };

    return process(0, -Infinity, new Map<string, number>());
  }
}

new Solution().lengthOfLIS([0, 3, 1, 3, 2, 3]);
