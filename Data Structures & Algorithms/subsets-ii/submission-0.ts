// You are given an array nums of integers, which may contain duplicates. Return all possible subsets.
// The solution must not contain duplicate subsets. You may return the solution in any order.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  subsetsWithDup(nums: number[]): number[][] {
    nums.sort((a: number, b: number) => a - b);

    const result: number[][] = [[]];
    const subResult: number[] = [];

    let lastPop: undefined | number;
    const explore = (offset: number) => {
      for (let i = 0 + offset; i < nums.length; i++) {
        if (lastPop !== nums[i]) {
          subResult.push(nums[i]!);
          result.push([...subResult]);
          explore(i + 1);
          lastPop = subResult.pop();
        }
      }
    };
    explore(0);
    return result;
  }
}

new Solution().subsetsWithDup([1, 2, 1]);
