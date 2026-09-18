// You are given an array of strings tokens that represents a valid arithmetic expression in Reverse Polish Notation.

// Return the integer that represents the evaluation of the expression.

// The operands may be integers or the results of other operations.
// The operators include '+', '-', '*', and '/'.
// Assume that division between integers always truncates toward zero.

class Solution {
  /**
   * @param {string[]} tokens
   * @return {number}
   */
  evalRPN(tokens: string[]): number {
    const stack: number[] = [];
    for (let index = 0; index < tokens.length; index++) {
      if (tokens[index] === "+") {
        stack.push(stack.pop()! + stack.pop()!);
      } else if (tokens[index] === "-") {
        let b = stack.pop()!;
        let a = stack.pop()!;
        stack.push(a - b);
      } else if (tokens[index] === "*") {
        stack.push(stack.pop()! * stack.pop()!);
      } else if (tokens[index] === "/") {
        let b = stack.pop()!;
        let a = stack.pop()!;
        stack.push(Math.trunc(a / b));
      } else {
        stack.push(Number(tokens[index]));
      }
    }
    return stack[stack.length - 1]!;
  }
}
