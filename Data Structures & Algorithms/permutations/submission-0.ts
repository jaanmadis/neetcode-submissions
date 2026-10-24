// Given an array nums of unique integers, return all the possible permutations. You may return the answer in any order.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const subResult: number[] = [];

    const explore = (numbers: number[]) => {
      if (numbers.length === 0) {
        result.push([...subResult]);
        return;
      }

      for (let count = 0; count < numbers.length; count++) {
        const curr = numbers.shift()!;
        subResult.push(curr);
        explore(numbers);
        subResult.pop();
        numbers.push(curr);
      }
    };

    explore(nums);
    return result;
  }
}

new Solution().permute([1, 2, 3]);
