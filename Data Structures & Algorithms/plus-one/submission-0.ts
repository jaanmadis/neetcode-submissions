// You are given an integer array digits, where each digits[i] is the ith digit of a large integer. It is ordered from most significant to least significant digit, and it will not contain any leading zero.

// Return the digits of the given integer after incrementing it by one.

class Solution {
  /**
   * @param {number[]} digits
   * @return {number[]}
   */
  plusOne(digits: number[]): number[] {
    for (let i = digits.length - 1; i >= 0; i--) {
      if (digits[i]! < 9) {
        digits[i]! += 1;
        return digits;
      } else {
        digits[i] = 0;
      }
    }
    digits.splice(0, 0, 1);
    return digits;
  }
}

new Solution().plusOne([1, 2, 3]);
