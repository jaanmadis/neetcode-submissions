// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II.
// The number 27 is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

// I can be placed before V (5) and X (10) to make 4 and 9.
// X can be placed before L (50) and C (100) to make 40 and 90.
// C can be placed before D (500) and M (1000) to make 400 and 900.
// You are given a roman numeral as a string s, convert it to an integer.

class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  romanToInt(s: string): number {
    const values: Record<string, number> = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let result = 0;
    for (let i = 0; i < s.length; i++) {
      const current = values[s[i]!]!;
      const next = values[s[i + 1]!] ?? 0;
      if (current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result;
  }

  romanToInt2(s: string): number {
    const process = (
      str: string,
      a: string,
      b: string,
      c: string,
      num: number,
    ): number => {
      if (str === a) {
        num = num + 1;
      } else if (str === b) {
        num = num === 1 ? 4 : 5;
      } else if (str === c) {
        num = num === 1 ? 9 : 0;
      }
      return num;
    };

    let ones = 0;
    let tens = 0;
    let huns = 0;
    let thos = 0;

    for (let i = 0; i < s.length; i++) {
      ones = process(s[i]!, "I", "V", "X", ones);
      if (ones === 0) {
        tens = process(s[i]!, "X", "L", "C", tens);
        if (tens === 0) {
          huns = process(s[i]!, "C", "D", "M", huns);
          if (huns === 0) {
            thos = process(s[i]!, "M", "M", "M", thos);
          }
        }
      }
    }

    return thos * 1000 + huns * 100 + tens * 10 + ones;
  }
}

new Solution().romanToInt("XLIX");
