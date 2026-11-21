// Pow(x, n) is a mathematical function to calculate the value of x raised to the power of n (i.e., x^n).

// Given a floating-point value x and an integer value n, implement the myPow(x, n) function, which calculates x raised to the power n.

// You may not use any built-in library functions.

class Solution {
  /**
   * @param {number} x
   * @param {number} n
   * @return {number}
   */
  myPow(x: number, n: number): number {
    let exp = Math.abs(n);
    let num = x;
    let result = 1;
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = result * num;
        exp = exp - 1;
      }
      exp = Math.floor(exp / 2);
      num = num * num;
    }
    return n > 0 ? result : 1 / result;
  }
}

const sol = new Solution().myPow(2, 12);
console.log(sol);
