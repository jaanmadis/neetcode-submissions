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
      let currIndex = 0 + offset;
      while (currIndex < nums.length) {
        const currVal = nums[currIndex]!;

        if (currVal === currTarget) {
          result.push([...subResult, currVal]);
        }

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
