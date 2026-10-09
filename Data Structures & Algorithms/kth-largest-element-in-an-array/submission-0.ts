// Given an unsorted array of integers nums and an integer k, return the kth largest element in the array.

// By kth largest element, we mean the kth largest element in the sorted order, not the kth distinct element.

// Follow-up: Can you solve it without sorting?

// You should aim for a solution as good or better than O(nlogk) time and O(k) space,
// where n is the size of the input array, and k represents the rank of the largest number to be returned
// (i.e., the k-th largest element).

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

const qsort = (input: number[]): number[] => {
  if (input.length <= 1) {
    return input;
  }

  const arrL = [];
  const arrR = [];
  const pivot = input[0]!;

  for (let i = 1; i < input.length; i++) {
    const num = input[i]!;
    if (num <= pivot) {
      arrL.push(num);
    } else {
      arrR.push(num);
    }
  }
  return qsort(arrL).concat([pivot], qsort(arrR));
};

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number}
   */

  // Quickselect
  findKthLargest(nums: number[], k: number): number {
    // If sorted asc, then index of Kth largest is: (nums.length - 1) - (k - 1)
    const indexOfKThLargest = nums.length - k;

    const qselect = (input: number[], target: number): number => {
      if (input.length === 1) {
        return input[0]!;
      }

      let arrL = [];
      let arrR = [];
      const pivot = input[0]!;

      for (let i = 1; i < input.length; i++) {
        const num = input[i]!;
        if (num <= pivot) {
          arrL.push(num);
        } else {
          arrR.push(num);
        }
      }

      const indexOfPivot = arrL.length;

      if (target < indexOfPivot) {
        return qselect(arrL, target);
      } else if (target > indexOfPivot) {
        return qselect(arrR, target - indexOfPivot - 1);
      } else {
        return pivot
      }
    };

    return qselect(nums, indexOfKThLargest);
  }

  findKthLargestHeap(nums: number[], k: number): number {
    const heap = new MinHeap();
    for (const num of nums) {
      heap.add(num);
      while (heap.size() > k) {
        heap.remove();
      }
    }
    return heap.peek()!;
  }
}
