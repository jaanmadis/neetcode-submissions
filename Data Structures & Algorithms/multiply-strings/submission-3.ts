// You are given two strings num1 and num2 that represent non-negative integers.

// Return the product of num1 and num2 in the form of a string.

// Assume that neither num1 nor num2 contain any leading zero, unless they are the number 0 itself.

// Note: You can not use any built-in library to convert the inputs directly into integers.

class Solution {
  /**
   * @param {string} num1
   * @param {string} num2
   * @return {string}
   */
  multiply(num1: string, num2: string): string {
    const digits1 = num1.split("").map((d) => Number(d));
    const digits2 = num2.split("").map((d) => Number(d));
    const ladder: number[][] = [];
    let row: number[] = [];
    let carry = 0;
    for (let i2 = digits2.length - 1; i2 >= 0; i2--) {
      for (let i1 = digits1.length - 1; i1 >= 0; i1--) {
        const prod = digits2[i2]! * digits1[i1]! + carry;
        carry = Math.floor(prod / 10);
        row.unshift(prod % 10);
      }
      if (carry !== 0) {
        row.unshift(carry);
        carry = 0;
      }
      ladder.push(row);
      row = [];
      for (let i = 0; i < ladder.length; i++) {
        row.push(0);
      }
    }

    const sums = [];
    let colOffset = 0;
    carry = 0;

    while (colOffset < ladder[ladder.length - 1]!.length) {
      let sum = 0;
      for (let row = 0; row < ladder.length; row++) {
        const lastCol = ladder[row]!.length - 1 - colOffset;
        if (lastCol < 0) {
          continue;
        }
        sum += ladder[row]![lastCol]!;
      }
      sum += carry;
      sums.unshift(sum % 10);
      carry = Math.floor(sum / 10);
      colOffset++;
    }
    if (carry !== 0) {
      sums.unshift(carry);
    }

    while (sums[0] === 0 && sums.length > 1) {
      sums.shift();
    }
    return sums.join("");
  }
}

new Solution().multiply("9", "99");
