// Given an integer n, count the number of 1's in the binary representation of every number in the range [0, n].

// Return an array output where output[i] is the number of 1's in the binary representation of i.

class Solution {
  /**
   * @param {number} n
   * @return {number[]}
   */
  countBits(n: number): number[] {
    const count = (input: number): number => {
      let result = 0;
      let number = input;
      while (number !== 0) {
        number = number & (number - 1);
        result++;
      }
      return result;
    };

    let result = [];
    for (let i = 0; i <= n; i++) {
      result.push(count(i));
    }
    return result;
  }
}

new Solution().countBits(4);
