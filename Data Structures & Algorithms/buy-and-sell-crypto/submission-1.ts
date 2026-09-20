// You are given an integer array prices where prices[i] is the price of NeetCoin on the ith day.
// You may choose a single day to buy one NeetCoin and choose a different day in the future to sell it.
// Return the maximum profit you can achieve.
// You may choose to not make any transactions,
// in which case the profit would be 0.

class Solution {
  /**
   * @param {number[]} prices
   * @return {number}
   */
  maxProfit(prices: number[]): number {
    // Init with day #1
    let minPrice = prices[0]!;
    let profit = 0;

    // Start from day #2
    for (let i = 1; i < prices.length; i++) {
      // Record the lowest price.
      minPrice = Math.min(minPrice, prices[i]!);

      // Record the maximum profit possible given the lowest price and price today.
      profit = Math.max(profit, prices[i]! - minPrice);
    }
    return profit;
  }
}

new Solution().maxProfit([100, 200, 1, 2, 300]);
