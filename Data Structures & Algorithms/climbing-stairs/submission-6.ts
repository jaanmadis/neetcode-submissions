// You are given an integer n representing the number of steps to reach the top of a staircase.
// You can climb with either 1 or 2 steps at a time.

// Return the number of distinct ways to climb to the top of the staircase.

class Solution {
  /**
   * @param {number} n
   * @return {number}
   */
  climbStairs(n: number): number {
    if (n <= 2) {
      return n;
    }
    const dp: number[] = [1, 2];

    for (let i = 3; i <= n; i++) {
      const prevMinus1 = dp[1]!;
      const prevMinus2 = dp[0]!;
      const next = prevMinus1 + prevMinus2;
      dp[0] = prevMinus1;
      dp[1] = next;
    }

    return dp[1]!;
  }

  climbStairsDPTopDown(n: number): number {
    const dpMemo = (num: number, cache: Map<number, number>): number => {
      // If n is one, then just one-step
      // If n is two, then one two-step or two one-steps
      if (num <= 2) {
        return num;
      }

      if (cache.has(num)) {
        return cache.get(num)!;
      }

      let climbRemainingByTakingOneStepNow = dpMemo(num - 1, cache);
      let climbRemainingByTakingTwoStepsNow = dpMemo(num - 2, cache);

      cache.set(
        num,
        climbRemainingByTakingOneStepNow + climbRemainingByTakingTwoStepsNow,
      );

      return cache.get(num)!;
    };

    return dpMemo(n, new Map<number, number>());
  }

  climbStairsRecursion(n: number): number {
    // If n is one, then just one-step
    // If n is two, then one two-step or two one-steps
    if (n <= 2) {
      return n;
    }
    let climbRemainingByTakingOneStepNow = this.climbStairsRecursion(n - 1);
    let climbRemainingByTakingTwoStepsNow = this.climbStairsRecursion(n - 2);
    let result =
      climbRemainingByTakingOneStepNow + climbRemainingByTakingTwoStepsNow;
    return result;
  }
}

new Solution().climbStairs(4);

// 1       1+1+1+1
// 2       1+1+2
// 3       1+2+1
// 4       2+1+1
// 5       2+2
