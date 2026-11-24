// You are given a network of n directed nodes, labeled from 1 to n. You are also given times, a list of directed edges where times[i] = (ui, vi, ti).

// ui is the source node (an integer from 1 to n)
// vi is the target node (an integer from 1 to n)
// ti is the time it takes for a signal to travel from the source to the target node (an integer greater than or equal to 0).
// You are also given an integer k, representing the node that we will send a signal from.

// Return the minimum time it takes for all of the n nodes to receive the signal. If it is impossible for all the nodes to receive the signal, return -1 instead.

type Edge = {
  val: number;
  neighbour: Node;
};

type Node = {
  val: number;
  edges: Edge[];
};

type MinHeapValue = {
  node: Node;
  min: number;
};

class Solution {
  /**
   * @param {number[][]} times
   * @param {number} n
   * @param {number} k
   * @return {number}
   */
  networkDelayTime(times: number[][], n: number, k: number): number {
    const nodes = new Map<number, Node>();
    for (let i = 1; i <= n; i++) {
      nodes.set(i, { val: i, edges: [] });
    }
    for (const time of times) {
      const source = time[0]!;
      const target = time[1]!;
      const u = nodes.get(source);
      const v = nodes.get(target);
      u!.edges.push({ val: time[2]!, neighbour: v! });
    }

    const kNode = nodes.get(k)!;
    const minHeap: MinHeapValue[] = [{ node: kNode, min: 0 }];
    const signals = new Map<Node, number>();

    while (minHeap.length > 0) {
      const value = minHeap.pop()!;

      if (signals.has(value.node)) {
        continue;
      }

      signals.set(value.node, value.min);

      for (const edge of value.node.edges) {
        minHeap.push({ node: edge.neighbour, min: edge.val + value.min });
      }

      minHeap.sort((a, b) => b.min - a.min);
    }

    let result = 0;
    for (const signalValue of signals.values()) {
      result = Math.max(result, signalValue);
    }
    return signals.size === nodes.size ? result : -1;
  }
}

new Solution().networkDelayTime(
  [
    [1, 2, 1],
    [2, 1, 3],
  ],
  2,
  2,
);

new Solution().networkDelayTime(
  [
    [1, 2, 1],
    [2, 3, 1],
    [1, 4, 4],
    [3, 4, 1],
  ],
  4,
  1,
);
