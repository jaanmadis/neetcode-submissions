// Implement a last-in-first-out (LIFO) stack using only two queues.
// The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

// Implement the MyStack class:

// void push(int x) Pushes element x to the top of the stack.
// int pop() Removes the element on the top of the stack and returns it.
// int top() Returns the element on the top of the stack.
// boolean empty() Returns true if the stack is empty, false otherwise.
// Notes:

// You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations.
// Depending on your language, the queue may not be supported natively.
// You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.

class MyStack {
  private queue: number[] = [];

  constructor() {}

  /**
   * @param {number} x
   * @return {void}
   */
  push(x: number): void {
    this.queue.push(x);
  }

  /**
   * @return {number}
   */
  pop(): number | null {
    let curr = null;
    const aux: number[] = [];
    while (this.queue.length > 0) {
      curr = this.queue.shift()!;
      if (this.queue.length > 0) {
        aux.push(curr);
      }
    }
    this.queue = aux;
    return curr;
  }

  /**
   * @return {number}
   */
  top(): number | null {
    const result = this.pop();
    if (result) {
      this.push(result);
    }
    return result;
  }

  /**
   * @return {boolean}
   */
  empty(): boolean {
    return this.queue.length === 0;
  }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
