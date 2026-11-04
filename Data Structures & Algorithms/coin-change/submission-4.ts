// You are given an integer array coins representing coins of
// different denominations (e.g. 1 dollar, 5 dollars, etc) and an integer amount representing a target amount of money.

// Return the fewest number of coins that you need to make up the exact target amount.
// If it is impossible to make up the amount, return -1.

// You may assume that you have an unlimited number of each coin.

class Solution {
  /**
   * @param {number[]} coins
   * @param {number} amount
   * @return {number}
   */
  coinChange(coins: number[], amount: number): number {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let sum = 1; sum <= amount; sum++) {
      for (const coin of coins) {
        if (sum >= coin) {
          dp[sum] = Math.min(1 + dp[sum - coin], dp[sum]);
        }
      }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
  }

  coinChangeMemo(coins: number[], amount: number): number {
    if (amount === 0) {
      return 0;
    }

    const coin = (
      index: number,
      sum: number,
      cache: Map<string, number>,
    ): number => {
      const key = `${index}|${sum}`;
      if (cache.has(key)) {
        return cache.get(key)!;
      }

      if (index >= coins.length) {
        return Infinity;
      }

      if (sum > amount) {
        return Infinity;
      }
      if (sum === amount) {
        return 0;
      }

      const takeMore = coin(index, coins[index]! + sum, cache) + 1;
      const takeNext = coin(index + 1, sum, cache);

      const value = Math.min(takeMore, takeNext);

      cache.set(key, value);

      return value;
    };

    const result = coin(0, 0, new Map<string, number>());
    return result === Infinity ? -1 : result;
  }
}

new Solution().coinChange([1, 3, 4, 5], 7);
