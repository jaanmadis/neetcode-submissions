// You are given an integer n. Return all well-formed parentheses strings that you can generate with n pairs of parentheses.

class Solution {
  /**
   * @param {number} n
   * @return {string[]}
   */
  generateParenthesis(n: number): string[] {
    // Helper to check for well formed or check of this can still become a well formed.
    // If mustBeWellFormed then it must be well formed
    // Else partially-well formed is ok (eg. "(((" is ok, while ")" is not ).
    const isWellPartiallyFormed = (
      input: string,
      mustBeWellFormed: boolean,
    ): boolean => {
      let openCtr: number = 0;
      const stack: string[] = [];
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "(") {
          stack.push(input[i]!);
          openCtr++;
        } else {
          if (stack[stack.length - 1] !== "(") {
            return false;
          }
          stack.pop();
          openCtr--;
        }
      }
      return stack.length === (mustBeWellFormed ? 0 : openCtr);
    };

    const result: string[] = [];
    let subResult: string[] = [];
    const explore = (length: number) => {
      const subStr = subResult.join("");
      const stillOk = isWellPartiallyFormed(subStr, length === 0);

      console.log(`exploring ${subStr}`);

      if (!stillOk) {
        console.log(`subStr ${subStr} is pointless to explore`);
        return;
      }

      if (length === 0) {
        console.log(`subStr ${subStr} is weel formed and done`);
        result.push(subStr);
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
