// The median is the middle value in a sorted list of integers. For lists of even length, there is no middle value, so the median is the mean of the two middle values.

// For example:

// For arr = [1,2,3], the median is 2.
// For arr = [1,2], the median is (1 + 2) / 2 = 1.5
// Implement the MedianFinder class:

// MedianFinder() initializes the MedianFinder object.
// void addNum(int num) adds the integer num from the data stream to the data structure.
// double findMedian() returns the median of all elements so far.

interface IHeap {
  add(value: number): void;
  peek(): number | undefined;
  remove(): number | undefined;
  size(): number;
}

class MaxHeap implements IHeap {
  private nodes: number[] = [];

  public add(value: number): void {
    this.nodes.push(value);

    // Heapify up: promote larger node to parent.
    let nodeIndex = this.nodes.length - 1;

    while (nodeIndex > 0) {
      // Get parent index.
      const parentIndex = Math.floor((nodeIndex - 1) / 2);
      // Is parent is larger?
      if (this.nodes[nodeIndex]! > this.nodes[parentIndex]!) {
        // Flip parent and child.
        const temp = this.nodes[parentIndex]!;
        this.nodes[parentIndex] = this.nodes[nodeIndex]!;
        this.nodes[nodeIndex]! = temp!;
        // Run the same logic with node's new position in the heap.
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

    // Get the head.
    const result = this.nodes[0];

    // Put last value as new head.
    // Unless heap only had 1 element.
    const last = this.nodes.pop()!;
    if (this.nodes.length > 0) {
      this.nodes[0] = last;
    }

    // Heapify down: promote larger child to parent.
    let nodeIndex = 0;
    while (nodeIndex < this.nodes.length) {
      // Get child indices.
      const leftChildIndex = nodeIndex * 2 + 1;
      const rightChildIndex = nodeIndex * 2 + 2;

      // There is no left child, stop.
      if (leftChildIndex >= this.nodes.length) {
        break;
      }

      // Assume left is larger...
      let largerChildIndex = leftChildIndex;

      // ...unless right is larger.
      if (
        rightChildIndex < this.nodes.length &&
        this.nodes[rightChildIndex]! > this.nodes[leftChildIndex]!
      ) {
        largerChildIndex = rightChildIndex;
      }

      // Parent is already larger than child, stop.
      if (this.nodes[nodeIndex]! >= this.nodes[largerChildIndex]!) {
        break;
      }

      // Flip parent and larger child.
      const temp = this.nodes[nodeIndex]!;
      this.nodes[nodeIndex] = this.nodes[largerChildIndex]!;
      this.nodes[largerChildIndex] = temp;

      // Run the same logic with parent's new position in the heap.
      nodeIndex = largerChildIndex;
    }
    return result;
  }

  public size(): number {
    return this.nodes.length;
  }
}

class MinHeap implements IHeap {
  private nodes: number[] = [];

  public add(value: number): void {
    this.nodes.push(value);

    // Heapify up, promote new node to parent.
    let nodeIndex = this.nodes.length - 1;
    while (nodeIndex > 0) {
      // Get parent index.
      const parentIndex = Math.floor((nodeIndex - 1) / 2);
      // Is parent is smaller.
      if (this.nodes[nodeIndex]! < this.nodes[parentIndex]!) {
        // Flip parent and child.
        const temp = this.nodes[parentIndex]!;
        this.nodes[parentIndex] = this.nodes[nodeIndex]!;
        this.nodes[nodeIndex]! = temp!;
        // Run the same logic with node's new position in the heap.
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

    // Pop the head.
    const result = this.nodes[0];

    // Put last value as new head.
    // Unless heap only had 1 element.
    const last = this.nodes.pop()!;
    if (this.nodes.length > 0) {
      this.nodes[0] = last;
    }

    // Heapify down, promote one child to parent.
    let nodeIndex = 0;
    while (nodeIndex < this.nodes.length) {
      // Get child indices.
      const leftChildIndex = nodeIndex * 2 + 1;
      const rightChildIndex = nodeIndex * 2 + 2;

      // There is no left child, stop.
      if (leftChildIndex >= this.nodes.length) {
        break;
      }

      // Assume left is smaller...
      let smallerChildIndex = leftChildIndex;

      // ...unless right is smaller.
      if (
        rightChildIndex < this.nodes.length &&
        this.nodes[rightChildIndex]! < this.nodes[leftChildIndex]!
      ) {
        smallerChildIndex = rightChildIndex;
      }

      // Parent is already smaller than child, stop.
      if (this.nodes[nodeIndex]! <= this.nodes[smallerChildIndex]!) {
        break;
      }

      // Flip parent and smaller child.
      const temp = this.nodes[nodeIndex]!;
      this.nodes[nodeIndex] = this.nodes[smallerChildIndex]!;
      this.nodes[smallerChildIndex] = temp;

      // Run the same logic with parent's new position in the heap.
      nodeIndex = smallerChildIndex;
    }
    return result;
  }

  public size(): number {
    return this.nodes.length;
  }
}

class MedianFinder {
  private small: MaxHeap = new MaxHeap();
  private large: MinHeap = new MinHeap();

  constructor() {}

  /**
   *
   * @param {number} num
   * @return {void}
   */
  addNum(num: number): void {
    this.small.add(num);
    if (this.small.peek()! > this.large.peek()!) {
      this.large.add(this.small.remove()!);
    }
    if (this.small.size() - this.large.size() >= 2) {
      this.large.add(this.small.remove()!);
    }
    if (this.large.size() - this.small.size() >= 2) {
      this.small.add(this.large.remove()!);
    }
  }

  /**
   * @return {number}
   */
  findMedian(): number {
    if (this.small.size() > this.large.size()) {
      return this.small.peek()!;
    }
    if (this.large.size() > this.small.size()) {
      return this.large.peek()!;
    }
    return (this.small.peek()! + this.large.peek()!) / 2;
  }
}
