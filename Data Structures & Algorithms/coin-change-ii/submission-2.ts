// You are given an integer array coins representing coins of
// different denominations (e.g. 1 dollar, 5 dollars, etc) and an integer amount representing a target amount of money.

// Return the number of distinct combinations that total up to amount. If it's impossible to make up the amount, return 0.

// You may assume that you have an unlimited number of each coin and that each value in coins is unique.

// You should aim for a solution as good or better than O(n * a) time and O(n * a) space, where n is the number of coins and a is the given amount.

class Solution {
  /**
   * @param {number} amount
   * @param {number[]} coins
   * @return {number}
   */
  change(amount: number, coins: number[]): number {
    // cols is number of ways to get to a sum
    //   5 4 3 2 1 0
    // 1         1 1    using 1 and 2 and 5
    // 2         0 1    using 2 and 5
    // 5 1 0 0 0 0 1    using only 5

    const dp = Array.from({ length: coins.length }, () =>
      Array(amount + 1).fill(-Infinity),
    );

    // There is one way to get to sum 0 using any coins
    for (let i = 0; i < dp.length; i++) {
      dp[i]![dp[i]!.length - 1] = 1;
    }

    for (let i = dp.length - 1; i >= 0; i--) {
      for (let j = dp[i]!.length - 2; j >= 0; j--) {
        const targetSum = amount - j;
        const coin = coins[i]!;
        const remainder = targetSum - coin;
        const withThisCoin = remainder >= 0 ? dp[i]![j + coin]! : 0;
        const withOtherCoins = i < dp.length - 1 ? dp[i + 1]![j] : 0;
        dp[i]![j]! = withThisCoin + withOtherCoins;
      }
    }

    return dp[0]![0]!;
  }

  changeMemo(amount: number, coins: number[]): number {
    const memo = new Map<string, number>();

    const find = (index: number, rem: number): number => {
      if (index >= coins.length) {
        return 0;
      }

      if (rem < 0) {
        return 0;
      }

      if (rem === 0) {
        return 1;
      }

      const key = `${index}-${rem}`;
      if (memo.has(key)) {
        return memo.get(key)!;
      }

      const take = find(index, rem - coins[index]!);
      const skip = find(index + 1, rem);

      const value = take + skip;
      memo.set(key, value);
      return value;
    };

    const out = find(0, amount);
    console.log(out);
    return out;
  }
}

new Solution().change(4, [1, 2, 3]);
