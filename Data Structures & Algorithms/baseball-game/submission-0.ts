// You are keeping the scores for a baseball game with strange rules.
// At the beginning of the game, you start with an empty record.

// Given a list of strings operations, where operations[i] is the ith operation you must apply to the record and is one of the following:

// An integer x: Record a new score of x.

// '+': Record a new score that is the sum of the previous two scores.
// 'D': Record a new score that is the double of the previous score.
// 'C': Invalidate the previous score, removing it from the record.

// Return the sum of all the scores on the record after applying all the operations.

class Solution {
  /**
   * @param {string[]} operations
   * @return {number}
   */
  calPoints(operations: string[]): number {
    const stack = [];
    for (const operation of operations) {
      if (operation.charAt(0) === "+") {
        const a: number = stack[stack.length - 1]!;
        const b: number = stack[stack.length - 2]!;
        stack.push(a + b);
      } else if (operation.charAt(0) === "D") {
        const a: number = stack[stack.length - 1]!;
        stack.push(a * 2);
      } else if (operation.charAt(0) === "C") {
        stack.pop();
      } else {
        stack.push(Number(operation));
      }
    }
    let result = 0;
    while (stack.length > 0) {
      result += Number(stack.pop());
    }
    return result;
  }
}

new Solution().calPoints(["1", "2", "+", "C", "5", "D"]);
