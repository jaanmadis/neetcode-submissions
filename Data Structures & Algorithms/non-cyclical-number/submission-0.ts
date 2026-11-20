// A non-cyclical number is an integer defined by the following algorithm:

// Given a positive integer, replace it with the sum of the squares of its digits.
// Repeat the above step until the number equals 1, or it loops infinitely in a cycle which does not include 1.
// If it stops at 1, then the number is a non-cyclical number.
// Given a positive integer n, return true if it is a non-cyclical number, otherwise return false.

class Solution {
  /**
   * @param {number} n
   * @return {boolean}
   */
  private seen = new Set<number>();

  isHappy(n: number): boolean {
    if (n === 1) {
      return true;
    }

    if (this.seen.has(n)) {
      return false;
    }
    this.seen.add(n);

    const str = String(n);
    const digits = str.split("").map((digit) => Number(digit));
    const result = digits.reduce((a: number, b: number) => a + b * b, 0);
    return this.isHappy(result);
  }
}

new Solution().isHappy(101);
