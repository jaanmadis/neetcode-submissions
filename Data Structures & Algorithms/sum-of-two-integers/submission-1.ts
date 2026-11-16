// Given two integers a and b, return the sum of the two integers without using the + and - operators.

class Solution {
  /**
   * @param {number} a
   * @param {number} b
   * @return {number}
   */
  getSum(a: number, b: number): number {
    // OR
    // AND
    // XOR
    // << LEFT SHIFT
    // >> RIGHT SHIFT
    // ~ NOT

    const mask = 1;
    let digitA;
    let digitB;
    let digitS;
    let carry = 0;
    let result = 0;

    for (let i = 0; i < 32; i++) {
      digitA = (a >> i) & mask;
      digitB = (b >> i) & mask;
      digitS = digitA ^ digitB ^ carry;
      digitS = digitS << i;
      result = result | digitS;
      carry = (digitA & digitB) | ((digitA ^ digitB) & carry);
    }

    return result;
  }
}

new Solution().getSum(20, 30);
// new Solution().getSum(4, 6);
// new Solution().getSum(4, 7);
