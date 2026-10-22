// You are given an array of distinct integers nums and a target integer target.
// Your task is to return a list of all unique combinations of nums where the chosen numbers sum to target.

// The same number may be chosen from nums an unlimited number of times.
// Two combinations are the same if the frequency of each of the chosen numbers is the same, otherwise they are different.

// You may return the combinations in any order and the order of the numbers in each combination can be in any order.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @returns {number[][]}
   */
  combinationSum(nums: number[], target: number): number[][] {
    const result: number[][] = [];

    const explore = (
      offset: number,
      currTarget: number,
      subResult: number[],
    ) => {
      // Loop through all numbers.
      // Offset to skip numbers already visited (to avoid dupes like 2+2+5 and 2+5+2).
      let currIndex = 0 + offset;
      while (currIndex < nums.length) {
        // Get the current number.
        const currVal = nums[currIndex]!;

        // If we reach the sum with current number, then record it.
        // Don't exit, keep exploring, nums is not sorted.
        if (currVal === currTarget) {
          result.push([...subResult, currVal]);
        }

        // If current number is smaller than target, then add it to the subresult and
        // recurse, starting from current index (since current number can be re-used).
        if (currVal < currTarget) {
          explore(currIndex, currTarget - currVal, [...subResult, currVal]);
        }

        currIndex++;
      }
    };

    explore(0, target, []);
    return result;
  }
}

new Solution().combinationSum([4, 2, 8], 8);
