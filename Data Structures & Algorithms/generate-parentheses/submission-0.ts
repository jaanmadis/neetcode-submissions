// You are given an integer n. Return all well-formed parentheses strings that you can generate with n pairs of parentheses.

class Solution {
  /**
   * @param {number} n
   * @return {string[]}
   */
  generateParenthesis(n: number): string[] {
    // Helper to check for well formed
    const isWellFormed = (input: string): boolean => {
      const stack: string[] = [];
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "(") {
          stack.push(input[i]!);
        } else {
          if (stack[stack.length - 1] !== "(") {
            return false;
          }
          stack.pop();
        }
      }
      return stack.length === 0;
    };

    const result: string[] = [];
    let subResult: string[] = [];
    const explore = (length: number) => {
      // Check if well-formed when we added all parentheses.
      // If yes, then capture the result.
      if (length === 0) {
        const subStr = subResult.join("");
        if (isWellFormed(subStr)) {
          result.push(subStr);
        }
        return;
      }

      // Add open bracket and explore.
      subResult.push("(");
      explore(length - 1);
      subResult.pop();

      // Add close bracket and explore.
      subResult.push(")");
      explore(length - 1);
      subResult.pop();
    };

    explore(n * 2);
    return result;
  }
}

new Solution().generateParenthesis(3);
