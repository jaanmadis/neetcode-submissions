// You are given an array of integers cost where cost[i]
// is the cost of taking a step from the ith floor of a staircase.
// After paying the cost, you can step to either the (i + 1)th floor or the (i + 2)th floor.

// You may choose to start at the index 0 or the index 1 floor.
// Return the minimum cost to reach the top of the staircase, i.e. just past the last index in cost.

class Solution {
  /**
   * @param {number[]} cost
   * @return {number}
   */
  minCostClimbingStairs(cost: number[]): number {
    const climb = (index: number, cache: Map<number, number>): number => {
      if (cache.has(index)) {
        return cache.get(index)!;
      }

      if (index >= cost.length) {
        return 0;
      }

      let pay = 0;
      if (index >= 0) {
        pay = cost[index]!;
      }

      const takeOneStep = climb(index + 1, cache);
      const takeTwoSteps = climb(index + 2, cache);

      const value = pay + Math.min(takeOneStep, takeTwoSteps);
      cache.set(index, value);

      return value;
    };

    return climb(-1, new Map<number, number>());
  }
}

new Solution().minCostClimbingStairs([1, 2, 3]);
