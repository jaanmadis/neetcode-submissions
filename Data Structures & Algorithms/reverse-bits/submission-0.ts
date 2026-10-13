// Given a 32-bit unsigned integer n, reverse the bits of the binary representation of n and return the result.

class Solution {
  /**
   * @param {number} n - a positive integer
   * @return {number} - a positive integer
   */
  reverseBits(n: number): number {
    let number = n;
    let result = 0;

    // number = 0010101 -> 0001010 -> 0000101 -> 0000010
    // result = 0000000 -> 0000001 -> 0000010 -> 0000101

    // Take last digit of number (number & 1)
    // Shift result's bits left (result << 1)
    // Then push the last digit into result ((result << 1) | (number & 1))
    // Then shift number right, pushing the last digit away.

    for (let i = 0; i < 32; i++) {
      result = (result << 1) | (number & 1);

      // Unsigned shift right and assign back to number
      number >>>= 1;
    }
    return result >>> 0;
  }
}

new Solution().reverseBits(21);
