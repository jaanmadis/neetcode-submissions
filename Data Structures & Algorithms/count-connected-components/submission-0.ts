// You have an undirected graph of n nodes labeled from 0 to n - 1.
// You are given an integer n and an array edges where edges[i] = [aᵢ, bᵢ] indicates that there is an edge between aᵢ and bᵢ in the graph.

// Return the number of connected components in the graph.

type GraphNode = {
  val: number;
  neighbours: GraphNode[];
};

class Solution {
  /**
   * @param {number} n
   * @param {number[][]} edges
   * @returns {number}
   */
  countComponents(n: number, edges: number[][]): number {
    const nodes = new Map<number, GraphNode>();
    for (let i = 0; i < n; i++) {
      nodes.set(i, { val: i, neighbours: [] });
    }
    for (const edge of edges) {
      const n0 = nodes.get(edge[0]!)!;
      const n1 = nodes.get(edge[1]!)!;
      n0.neighbours.push(n1);
      n1.neighbours.push(n0);
    }
    const visited = new Set<GraphNode>();
    const dfsUndirected = (node: GraphNode) => {
      visited.add(node);
      for (const neighbour of node.neighbours) {
        if (!visited.has(neighbour)) {
          dfsUndirected(neighbour);
        }
      }
    };
    let result = 0;
    for (const value of nodes.values()) {
      if (!visited.has(value)) {
        result++;
        dfsUndirected(value);
      }
    }
    return result;
  }
}

new Solution().countComponents(5, [
  [0, 1],
  [1, 2],
  [3, 4],
]);
