// You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

// Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

// If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

type Edge = {
  to: MyNode;
  succ: number;
  fail: number;
};

type MyNode = {
  n: number;
  edges: Edge[];
};

type MinHeapValue = {
  node: MyNode;
  value: number;
};

class Solution {
  /**
   * @param {number} n
   * @param {number[][]} edges
   * @param {number[]} succProb
   * @param {number} start_node
   * @param {number} end_node
   * @return {number}
   */
  maxProbability(
    n: number,
    edges: number[][],
    succProb: number[],
    start_node: number,
    end_node: number,
  ) {
    const nodes = new Map<number, MyNode>();
    for (let i = 0; i < n; i++) {
      nodes.set(i, { n: i, edges: [] });
    }
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]!;
      const a = nodes.get(edge[0]!)!;
      const b = nodes.get(edge[1]!)!;
      a.edges.push({ to: b, succ: succProb[i]!, fail: 1 - succProb[i]! });
      b.edges.push({ to: a, succ: succProb[i]!, fail: 1 - succProb[i]! });
    }
    const maxHeap: MinHeapValue[] = [
      { node: nodes.get(start_node)!, value: 1 },
    ];
    const probs = new Map<MyNode, number>();
    while (maxHeap.length > 0) {
      const curr = maxHeap.pop()!;
      if (probs.has(curr.node)) {
        continue;
      }
      probs.set(curr.node, curr.value);
      for (const edge of curr.node.edges) {
        maxHeap.push({
          node: edge.to,
          value: edge.succ * curr.value,
        });
      }
      maxHeap.sort((a, b) => a.value - b.value);
    }
    return probs.get(nodes.get(end_node)!) ?? 0;
  }

  maxProbability2(
    n: number,
    edges: number[][],
    succProb: number[],
    start_node: number,
    end_node: number,
  ) {
    const nodes = new Map<number, MyNode>();
    for (let i = 0; i < n; i++) {
      nodes.set(i, { n: i, edges: [] });
    }
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]!;
      const a = nodes.get(edge[0]!)!;
      const b = nodes.get(edge[1]!)!;
      a.edges.push({ to: b, succ: succProb[i]!, fail: 1 - succProb[i]! });
      b.edges.push({ to: a, succ: succProb[i]!, fail: 1 - succProb[i]! });
    }
    const minHeap: MinHeapValue[] = [
      { node: nodes.get(start_node)!, value: 0 },
    ];
    const probs = new Map<MyNode, number>();
    while (minHeap.length > 0) {
      const curr = minHeap.pop()!;
      if (probs.has(curr.node)) {
        continue;
      }
      probs.set(curr.node, curr.value);
      for (const edge of curr.node.edges) {
        minHeap.push({
          node: edge.to,
          value: 1 - edge.succ * (1 - curr.value),
        });
      }
      minHeap.sort((a, b) => b.value - a.value);
    }
    const fail = probs.get(nodes.get(end_node)!);
    return fail ? 1 - fail : 0;
  }
}

new Solution().maxProbability(3, [[0, 1]], [0.5], 0, 2);
