// You are given an 2-D array points where points[i] = [xi, yi]
// represents the coordinates of a point on an X-Y axis plane. You are also given an integer k.

// Return the k closest points to the origin (0, 0).

// The distance between two points is defined as the Euclidean distance (sqrt((x1 - x2)^2 + (y1 - y2)^2)).

// You may return the answer in any order.
// The answer is guaranteed to be unique(except for the order in which the points are returned.)

type HeapNode = {
  value: number;
  x: number;
  y: number;
};

interface IHeap {
  add(value: number, x: number, y: number): void;
  peek(): number | undefined;
  remove(): HeapNode | undefined;
  size(): number;
}

class CustomMaxHeap implements IHeap {
  private nodes: HeapNode[] = [];

  public add(value: number, x: number, y: number): void {
    const newValue: HeapNode = {
      value,
      x,
      y,
    };

    this.nodes.push(newValue);

    // Heapify up: promote larger node to parent.
    let nodeIndex = this.nodes.length - 1;

    while (nodeIndex > 0) {
      // Get parent index.
      const parentIndex = Math.floor((nodeIndex - 1) / 2);
      // Is parent is larger?
      if (this.nodes[nodeIndex]!.value! > this.nodes[parentIndex]!.value!) {
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
    return this.nodes[0] ? this.nodes[0].value : undefined;
  }

  public remove(): HeapNode | undefined {
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
        this.nodes[rightChildIndex]!.value! > this.nodes[leftChildIndex]!.value!
      ) {
        largerChildIndex = rightChildIndex;
      }

      // Parent is already larger than child, stop.
      if (
        this.nodes[nodeIndex]!.value! >= this.nodes[largerChildIndex]!.value!
      ) {
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
   * @param {number[][]} points
   * @param {number} k
   * @return {number[][]}
   */
  kClosest(points: number[][], k: number): number[][] {
    const heap = new CustomMaxHeap();
    
    // Add distance square and x and y to max heap.
    // Evict values, so we only have k values in heap. 
    // Max heap, so larges will be evicted, smalls kept.
    // Return all values, order doesn't metter so we don't care what is smallest.
    for (const point of points) {
      const x = point[0]!;
      const y = point[1]!;
      const distanceSQ = x * x + y * y;
      heap.add(distanceSQ, x, y);
      while (heap.size() > k) {
        heap.remove();
      }
    }
    let result = [];
    while (heap.size() > 0) {
      const node = heap.remove();
      result.push([node!.x, node!.y]);
    }
    return result;
  }
}
