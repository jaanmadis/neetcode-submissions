// You are given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize.

// You want to rearrange the cards into groups so that each group is of size groupSize, and card values are consecutively increasing by 1.

// Return true if it's possible to rearrange the cards in this way, otherwise, return false.

// You should aim for a solution as good or better than O(nlogn) time and O(n) space, where n is the size of the input array.

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

class Solution {
  /**
   * @param {number[]} hand
   * @param {number} groupSize
   * @return {boolean}
   */
  isNStraightHand(hand: number[], groupSize: number): boolean {
    const freqMap = new Map<number, number>();
    const smalls = new MinHeap();

    for (const h of hand) {
      let freq = 1;
      if (freqMap.has(h)) {
        freq = freqMap.get(h)! + 1;
      } else {
        smalls.add(h);
      }
      freqMap.set(h, freq);
    }

    while (smalls.size() > 0 || freqMap.size > 0) {
      let element = smalls.peek()!;
      let elementsLeft = groupSize;
      while (elementsLeft > 0) {
        const freq = freqMap.get(element)!;
        if (freq === undefined) {
          return false;
        }
        const newFreq = freq - 1;
        if (newFreq < 0) {
          return false;
        }
        if (newFreq === 0) {
          if (smalls.peek() === element) {
            smalls.remove();
          } else {
            return false;
          }
          freqMap.delete(element);
        } else {
          freqMap.set(element, newFreq);
        }
        element += 1;
        elementsLeft--;
      }
    }

    return true;
  }
}

new Solution().isNStraightHand([1, 2, 3, 4, 5], 4);
