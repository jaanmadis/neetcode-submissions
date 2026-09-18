// Design a stack class that supports the push, pop, top, and getMin operations.

// MinStack() initializes the stack object.
// void push(int val) pushes the element val onto the stack.
// void pop() removes the element on the top of the stack.
// int top() gets the top element of the stack.
// int getMin() retrieves the minimum element in the stack.
// Each function should run in O(1) time.

class MinStack {
  private stack: number[];
  private mins: number[];

  constructor() {
    this.stack = [];
    this.mins = [];
  }

  /**
   * @param {number} val
   * @return {void}
   */
  push(val: number): void {
    this.stack.push(val);
    // If pushing new (or equal) minimum value into main stack, then push it into min stack too.
    if (this.mins.length === 0 || this.mins[this.mins.length - 1]! >= val) {
      this.mins.push(val);
    }
  }

  /**
   * @return {void}
   */
  pop(): void {
    // If removing the current minimum value from main stack, then remove it from min stack too.
    if (this.stack[this.stack.length - 1] === this.mins[this.mins.length - 1]) {
      this.mins.pop();
    }
    this.stack.pop();
  }

  /**
   * @return {number}
   */
  top(): number {
    return this.stack[this.stack.length - 1]!;
  }

  /**
   * @return {number}
   */
  getMin(): number {
    return this.mins[this.mins.length - 1]!;
  }
}
