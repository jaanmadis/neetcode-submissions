// You are given an unsigned integer n. Return the number of 1 bits in its binary representation.

// You may assume n is a non-negative integer which fits within 32-bits.

class Solution {
  /**
   * @param {number} n - a positive integer
   * @return {number}
   */
  hammingWeight(n: number): number {
    let result = 0;
    let num = n;
    // If number is xxxx10000.
    // Then number-1 would be xxxx01111, the rightmost "1" turns to "0" and all "0"s to the right of it turn to "1"s.
    // AND-ing number and number-1 yields xxxx00000, all the "1"s on the right turn to "0"s.
    // So this trick "removes" one "1" from the number.
    // Repeat this until entire number is just "0"s.
    while (num > 0) {
      num = num & (num - 1);
      result++;
    }
    return result;
  }

  hammingWeightBruteForce(n: number): number {
    let result = 0;
    let num = n;
    let rem = 0;
    // Keep dividing n by 2 until 0.
    // Remainders are the binary digits (backward).
    while (num > 0) {
      rem = num % 2;
      if (rem === 1) {
        result++;
      }
      num = Math.trunc(num / 2);
    }
    return result;
  }
}

const test = new Solution().hammingWeight(2147483645);
console.log(test);
