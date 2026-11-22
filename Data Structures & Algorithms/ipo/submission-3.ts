// A company has limited resources, it can only finish at most k distinct projects before the IPO. Help the company to design the best way to maximize its total capital after finishing at most k distinct projects.

// You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it. Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

// Pick a list of at most k distinct projects from given projects to maximize your final capital, and return the final maximized capital.

// The answer is guaranteed to fit in a 32-bit signed integer.

type Project = {
  profit: number;
  capital: number;
  done: boolean;
};

interface IProfitHeap {
  add(value: Project): void;
  peek(): Project | undefined;
  remove(): Project | undefined;
  size(): number;
}

interface IHeap {
  add(value: number): void;
  peek(): number | undefined;
  remove(): number | undefined;
  size(): number;
}

class MaxProfitHeap implements IProfitHeap {
  private nodes: Project[] = [];

  public add(value: Project): void {
    this.nodes.push(value);

    // Heapify up: promote larger node to parent.
    let nodeIndex = this.nodes.length - 1;

    while (nodeIndex > 0) {
      // Get parent index.
      const parentIndex = Math.floor((nodeIndex - 1) / 2);
      // Is parent is larger?
      if (this.nodes[nodeIndex]?.profit! > this.nodes[parentIndex]?.profit!) {
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

  public peek(): Project | undefined {
    return this.nodes[0];
  }

  public remove(): Project | undefined {
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
        this.nodes[rightChildIndex]?.profit! >
          this.nodes[leftChildIndex]?.profit!
      ) {
        largerChildIndex = rightChildIndex;
      }

      // Parent is already larger than child, stop.
      if (
        this.nodes[nodeIndex]?.profit! >= this.nodes[largerChildIndex]?.profit!
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
   * @param {number} k
   * @param {number} w
   * @param {number[]} profits
   * @param {number[]} capital
   * @return {number}
   */
  findMaximizedCapital(
    k: number,
    w: number,
    profits: number[],
    capital: number[],
  ): number {
    // Alternatively, this can be min-heap:
    // 1. Put all projects into a min-heap ordered by required capital.
    // 2. Each iteration, move all affordable projects from the min-heap into a max-heap ordered by profit.
    // 3. Extract the most profitable project from the max-heap.

    // Store all projects in an array and sort array by capital requirements, cheaper projects first.
    const projects: Project[] = [];
    for (let i = 0; i < profits.length; i++) {
      projects.push({ profit: profits[i]!, capital: capital[i]!, done: false });
    }
    projects.sort((a, b) => {
      const capital = a.capital - b.capital;
      return capital === 0 ? a.profit - b.profit : capital;
    });

    const maxProfits = new MaxProfitHeap();

    let currentCapital = w;
    let projectIndex = 0;
    while (k > 0) {
      // Add all currently affordable projects into maxProfits heap.
      // Projects array is sorted by cost.
      // If we find a project that we cannot afford, then we can stop here and work with what we have for now.
      while (
        projectIndex < projects.length &&
        projects[projectIndex]!.capital <= currentCapital
      ) {
        maxProfits.add(projects[projectIndex]!);
        projectIndex++;
      }

      // Get the most profitable project from maxProfits heap and run it.
      // Add its profit to current capital.
      // Continue scanning the projects array and add more affordable projects if we have any more time (k) left.
      if (maxProfits.size() === 0) {
        break;
      }
      currentCapital += maxProfits.remove()!.profit;
      k--;
    }
    return currentCapital;
  }

  findMaximizedCapitalNoHeap(
    k: number,
    w: number,
    profits: number[],
    capital: number[],
  ): number {
    const projects: Project[] = [];
    for (let i = 0; i < profits.length; i++) {
      projects.push({ profit: profits[i]!, capital: capital[i]!, done: false });
    }
    projects.sort((a, b) => {
      const capital = a.capital - b.capital;
      return capital === 0 ? a.profit - b.profit : capital;
    });

    let currentCapital = w;
    while (k > 0) {
      let bestProfit = -Infinity;
      let bestProfitIndex = -1;
      for (let i = 0; i < projects.length; i++) {
        if (projects[i]!.capital > currentCapital) {
          break;
        }
        if (projects[i]!.profit > bestProfit && !projects[i]!.done) {
          bestProfit = projects[i]!.profit;
          bestProfitIndex = i;
        }
      }
      if (bestProfitIndex === -1) {
        break;
      }
      currentCapital += projects[bestProfitIndex]!.profit;
      projects[bestProfitIndex]!.done = true;
      k--;
    }

    return currentCapital;
  }
}

// new Solution().findMaximizedCapital(
//   4,
//   1,
//   [7, 1, 5, 3, 8, 7],
//   [2, 2, 3, 4, 5, 5],
// );
new Solution().findMaximizedCapital(4, 2, [2, 3, 1, 5, 3], [4, 4, 2, 3, 3]);
