// You are given an array of integers stones where stones[i] represents the weight of the ith stone.

// We want to run a simulation on the stones as follows:

// At each step we choose the two heaviest stones, with weight x and y and smash them togethers
// If x == y, both stones are destroyed
// If x < y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
// Continue the simulation until there is no more than one stone remaining.

// Return the weight of the last remaining stone or return 0 if none remain.

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

class Solution {
  /**
   * @param {number[]} stones
   * @return {number}
   */
  lastStoneWeight(stones: number[]): number {
    const heap = new MaxHeap();
    // Add to max heap.
    for (const stone of stones) {
      heap.add(stone);
    }
    // Smash stones until one or none left.
    while (heap.size() > 1) {
      // Take two largest.
      // X is larger than Y because it is removed first.
      const x = heap.remove()!;
      const y = heap.remove()!;
      if (x !== y) {
        // Add back what remains.
        heap.add(x - y);
      }
    }
    // Return what is left
    return heap.size() === 0 ? 0 : heap.peek()!;
  }
}
