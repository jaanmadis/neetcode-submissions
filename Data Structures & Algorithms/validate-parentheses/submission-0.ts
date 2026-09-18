// You are given a string s consisting of the following characters: '(', ')', '{', '}', '[' and ']'.

// The input string s is valid if and only if:

// Every open bracket is closed by the same type of close bracket.
// Open brackets are closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.
// Return true if s is a valid string, and false otherwise.

// 1 <= s.length <= 1000

class Solution {
  /**
   * @param {string} s
   * @return {boolean}
   */
  isValid(s: string): boolean {
    const stack: string[] = [];
    for (let index = 0; index < s.length; index++) {
      if (s[index] === "(" || s[index] === "[" || s[index] === "{") {
        stack.push(s[index]!);
      } else if (
        (s[index] === ")" && stack[stack.length - 1] === "(") ||
        (s[index] === "]" && stack[stack.length - 1] === "[") ||
        (s[index] === "}" && stack[stack.length - 1] === "{")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
    return stack.length === 0;
  }
}

const solution = new Solution();
solution.isValid("[]");
solution.isValid("([{}])");
solution.isValid("[(])");
