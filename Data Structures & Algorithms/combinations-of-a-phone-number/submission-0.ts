// You are given a string digits made up of digits from 2 through 9 inclusive.

// Each digit (not including 1) is mapped to a set of characters as shown below:

// A digit could represent any one of the characters it maps to.

// Return all possible letter combinations that digits could represent. You may return the answer in any order.

const ARR2 = ["a", "b", "c"];
const ARR3 = ["d", "e", "f"];
const ARR4 = ["g", "h", "i"];
const ARR5 = ["j", "k", "l"];
const ARR6 = ["m", "n", "o"];
const ARR7 = ["p", "q", "r", "s"];
const ARR8 = ["t", "u", "v"];
const ARR9 = ["w", "x", "y", "z"];

class Solution {
  /**
   * @param {string} digits
   * @return {string[]}
   */
  letterCombinations(digits: string): string[] {
    if (digits.length === 0) {
      return [];
    }

    const result: string[] = [];

    let subResult: string[] = [];

    // Helper to get the char. Some arrays are longer than the others.
    const getChar = (digit: string, index: number): string | undefined => {
      switch (digit) {
        case "2":
          return ARR2[index]!;
        case "3":
          return ARR3[index]!;
        case "4":
          return ARR4[index]!;
        case "5":
          return ARR5[index]!;
        case "6":
          return ARR6[index]!;
        case "7":
          return ARR7[index]!;
        case "8":
          return ARR8[index]!;
        case "9":
          return ARR9[index]!;
      }
      return undefined;
    };

    // Take first digit, get the first char for this digit.
    // Explore the rest of the string.
    // Record the result when string is exhausted.
    // Get the next char for this digit, repeat until no more chars for this digit.
    const explore = (subStr: string) => {
      if (subStr.length === 0) {
        result.push(subResult.join(""));
        return;
      }

      let charIndex = 0;
      while (true) {
        const char = getChar(subStr[0]!, charIndex);
        if (char === undefined) {
          break;
        }
        subResult.push(char);
        explore(subStr.substring(1));
        subResult.pop();
        charIndex++;
      }
    };

    explore(digits);

    return result;
  }
}

new Solution().letterCombinations("34");
