// You are given an array of integers nums and an integer target.

// For each number in the array, you can choose to either add or subtract it to a total sum.

// For example, if nums = [1, 2], one possible sum would be "+1-2=-1".
// If nums=[1,1], there are two different ways to sum the input numbers to get a sum of 0: "+1-1" and "-1+1".

// Return the number of different ways that you can build the expression such that the total sum equals target.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  findTargetSumWays(nums: number[], target: number): number {
    const sum = nums.reduce((a, b) => a + b);
    let prev = Array(sum * 2 + 1).fill(0);
    prev[sum] = 1;

    let curr;
    for (const num of nums) {
      curr = Array(sum * 2 + 1).fill(0);
      for (let i = 0; i < prev.length; i++) {
        if (prev[i] !== 0) {
          curr[i - num] = curr[i - num] + prev[i];
          curr[i + num] = curr[i + num] + prev[i];
        }
      }
      prev = curr;
    }
    return curr![sum + target] ?? 0;
  }

  findTargetSumWaysMemo(nums: number[], target: number): number {
    const memo = new Map<string, number>();

    const find = (index: number, curr: number): number => {
      if (index >= nums.length) {
        return curr === target ? 1 : 0;
      }

      const key = `${index}-${curr}`;
      if (memo.has(key)) {
        return memo.get(key)!;
      }

      const plus = find(index + 1, curr + nums[index]!);
      const minus = find(index + 1, curr - nums[index]!);

      const value = plus + minus;
      memo.set(key, value);
      return value;
    };

    return find(0, 0);
  }
}

new Solution().findTargetSumWays([2, 2, 2], 2);
