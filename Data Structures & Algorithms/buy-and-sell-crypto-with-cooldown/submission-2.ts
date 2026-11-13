// You are given an integer array prices where prices[i] is the price of NeetCoin on the ith day.

// You may buy and sell one NeetCoin multiple times with the following restrictions:

// After you sell your NeetCoin, you cannot buy another one on the next day (i.e., there is a cooldown period of one day).
// You may only own at most one NeetCoin at a time.
// You may complete as many transactions as you like.

// Return the maximum profit you can achieve.

class Solution {
  /**
   * @param {number[]} prices
   * @return {number}
   */
  maxProfit(prices: number[]): number {
    // Translate these into DP:
    //
    // const buy = haveCoin ? 0 : prices[index]! * -1 + profit(index + 1, true);
    // const sell = haveCoin ? prices[index]! + profit(index + 2, false) : 0;
    // const skip = profit(index + 1, haveCoin);
    //
    // Maximum future profit if I start day i with NO coin.
    // dp[i][0] = max( -1 * prices[i] + dp[i + 1][1], dp[i + 1][0] )
    //
    // Maximum future profit if I start day i HOLDING a coin.
    // dp[i][1] = max( +1 * prices[i] + dp[i + 2][0], dp[i + 1][1] )
    //
    // We move right to left, so we need 2 extra slots in DP for +1 and +2 cases
    // Profits for these extra days are zero

    const dp = Array.from({ length: prices.length + 2 }, () =>
      Array(2).fill(0),
    );

    for (let i = prices.length - 1; i >= 0; i--) {
      dp[i]![0] = Math.max(-1 * prices[i]! + dp[i + 1]![1], dp[i + 1]![0]);
      dp[i]![1] = Math.max(+1 * prices[i]! + dp[i + 2]![0], dp[i + 1]![1]);
    }

    // We start day 0 with no coin, so dp[0][1] is not a real scenario.
    return dp[0]![0]!;
  }

  maxProfitMemo(prices: number[]): number {
    const memo = new Map<string, number>();

    const profit = (index: number, haveCoin: boolean): number => {
      if (index >= prices.length) {
        return 0;
      }

      const key = `${index}-${haveCoin}`;

      if (memo.has(key)) {
        return memo.get(key)!;
      }

      // Can buy only if we have no coin. Buying decreases our balance.
      // Can sell only if we have coin. Selling increases balance.
      // Can skip the day.

      const buy = haveCoin ? 0 : prices[index]! * -1 + profit(index + 1, true);
      const sell = haveCoin ? prices[index]! + profit(index + 2, false) : 0;
      const skip = profit(index + 1, haveCoin);

      const value = Math.max(buy, sell, skip);

      memo.set(key, value);

      return value;
    };

    return profit(0, false);
  }
}

new Solution().maxProfit([1, 3, 4, 0, 4]);
