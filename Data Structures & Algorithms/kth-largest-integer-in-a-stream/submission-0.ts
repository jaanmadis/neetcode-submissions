// Design a class to find the kth largest integer in a stream of values, including duplicates.
// E.g. the 2nd largest from [1, 2, 3, 3] is 3. The stream is not necessarily sorted.

// Implement the following methods:

// constructor(int k, int[] nums) Initializes the object given an integer k and the stream of integers nums.
// int add(int val) Adds the integer val to the stream and returns the kth largest integer in the stream.

interface IHeap {
  add(value: number): void;
  peek(): number | undefined;
  remove(): number | undefined;
  size(): number;
}

class Heap implements IHeap {
  private nodes: number[] = [];

  public add(value: number): void {
    this.nodes.push(value);

    let nodeIndex = this.nodes.length - 1;
    while (nodeIndex > 0) {
      const parentIndex = Math.floor((nodeIndex - 1) / 2);
      if (this.nodes[nodeIndex]! < this.nodes[parentIndex]!) {
        const temp = this.nodes[parentIndex]!;
        this.nodes[parentIndex] = this.nodes[nodeIndex]!;
        this.nodes[nodeIndex]! = temp!;
        nodeIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  public peek(): number | undefined {
    return this.nodes[0];
  }

  public remove(): number | undefined {
    if (this.nodes.length === 0) {
      return undefined;
    }
    const result = this.nodes[0];
    this.nodes[0] = this.nodes.pop()!;
    let nodeIndex = 0;
    while (nodeIndex < this.nodes.length) {
      const leftChildIndex = nodeIndex * 2 + 1;
      const rightChildIndex = nodeIndex * 2 + 2;

      if (leftChildIndex >= this.nodes.length) {
        break;
      }

      let smallerChildIndex = leftChildIndex;
      if (
        rightChildIndex < this.nodes.length &&
        this.nodes[rightChildIndex]! < this.nodes[leftChildIndex]!
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.nodes[nodeIndex]! <= this.nodes[smallerChildIndex]!) {
        break;
      }

      const temp = this.nodes[nodeIndex]!;
      this.nodes[nodeIndex] = this.nodes[smallerChildIndex]!;
      this.nodes[smallerChildIndex] = temp;

      nodeIndex = smallerChildIndex;
    }
    return result;
  }

  public size(): number {
    return this.nodes.length;
  }
}

class KthLargest {
  /**
   * @param {number} k
   * @param {number[]} nums
   */
  private k = 0;
  private heap = new Heap();

  constructor(k: number, nums: number[]) {
    this.k = k;
    for (const num of nums) {
      this.add(num);
    }
  }

  /**
   * @param {number} val
   * @return {number}
   */
  add(val: number): number {
    this.heap.add(val);
    if (this.heap.size() > this.k) {
      this.heap.remove();
    }
    return this.heap.peek()!;
  }
}

const h = new Heap();
h.add(5);
h.add(6);
h.add(7);
h.add(1);
const kl = new KthLargest(3, [1, 2, 3, 3]);
kl.add(3);
kl.add(5);
kl.add(6);
kl.add(7);
kl.add(8);
