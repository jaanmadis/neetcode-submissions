// You are given an integer array coins representing coins of
// different denominations (e.g. 1 dollar, 5 dollars, etc) and an integer amount representing a target amount of money.

// Return the number of distinct combinations that total up to amount. If it's impossible to make up the amount, return 0.

// You may assume that you have an unlimited number of each coin and that each value in coins is unique.

class Solution {
  /**
   * @param {number} amount
   * @param {number[]} coins
   * @return {number}
   */
  change(amount: number, coins: number[]): number {
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
