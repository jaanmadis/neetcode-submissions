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
    const memo = new Map<string, number>();

    const profit = (index: number, have: boolean): number => {
      if (index >= prices.length) {
        return 0;
      }

      const key = `${index}-${have}`;

      if (memo.has(key)) {
        return memo.get(key)!;
      }

      console.log(`index=${index}, price=${prices[index]}, have coin=${have}`);

      const buy = have ? 0 : prices[index]! * -1 + profit(index + 1, true);
      const sell = have ? prices[index]! * +1 + profit(index + 2, false) : 0;
      const skip = profit(index + 1, have);

      const value = Math.max(buy, sell, skip);

      console.log(
        `index=${index}, price=${prices[index]}, buy=${buy}, sell=${sell}, skip=${skip} value=${value}`,
      );

      memo.set(key, value);

      return value;
    };

    const out = profit(0, false);
    console.log(out);
    return out;
  }
}

new Solution().maxProfit([1, 3, 4, 0, 4]);
