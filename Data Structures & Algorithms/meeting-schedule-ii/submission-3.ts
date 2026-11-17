// Given an array of meeting time interval objects consisting of
// start and end times [[start_1,end_1],[start_2,end_2],...] (start_i < end_i),
// find the minimum number of rooms required to schedule all meetings without any conflicts.

interface IHeap {
  add(value: number): void;
  peek(): number | undefined;
  remove(): number | undefined;
  size(): number;
}

class MinHeap implements IHeap {
  private nodes: number[] = [];

  public add(value: number): void {
    this.nodes.push(value);

    // Heapify up, move the new node toward the root.
    let nodeIndex = this.nodes.length - 1;
    while (nodeIndex > 0) {
      // Get new node's parent index.
      const parentIndex = Math.floor((nodeIndex - 1) / 2);
      // If the parent is larger than the child...
      if (this.nodes[nodeIndex]! < this.nodes[parentIndex]!) {
        // ...then flip parent and child.
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

// class Interval {
//   start: number;
//   end: number;
//   constructor(start: number, end: number) {
//     this.start = start;
//     this.end = end;
//   }
// }

class Solution {
  /**
   * @param {Interval[]} intervals
   * @returns {number}
   */
  minMeetingRooms(intervals: Interval[]): number {
    if (intervals.length === 0) {
      return 0;
    }
    const minHeap = new MinHeap();
    intervals.sort((a, b) => a.start - b.start);
    minHeap.add(intervals[0]!.end);
    for (let i = 1; i < intervals.length; i++) {
      if (minHeap.peek()! <= intervals[i]!.start) {
        minHeap.remove();
      }
      minHeap.add(intervals[i]!.end);
    }
    return minHeap.size();
  }
}

// new Solution().minMeetingRooms([
//   new Interval(4, 14),
//   new Interval(18, 104),
//   new Interval(111, 129),
//   new Interval(134, 189),
//   new Interval(199, 282),
//   new Interval(292, 345),
//   new Interval(354, 380),
//   new Interval(386, 462),
//   new Interval(465, 497),
//   new Interval(499, 562),
// ]);
