// Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes),
// write a function to check whether these edges make up a valid tree.

type Node = {
  val: number;
  neighbours: Node[];
};

class Solution {
  /**
   * @param {number} n
   * @param {number[][]} edges
   * @returns {boolean}
   */
  validTree(n: number, edges: number[][]): boolean {
    // Build nodes
    const nodes = new Map<number, Node>();
    for (let i = 0; i < n; i++) {
      nodes.set(i, { val: i, neighbours: [] });
    }

    // Build edges
    for (const edge of edges) {
      const n0 = nodes.get(edge[0]!)!;
      const n1 = nodes.get(edge[1]!)!;
      n0.neighbours.push(n1);
      n1.neighbours.push(n0);
    }

    // DFS for loops, keep track of prev node visited since this is undirected graph.
    const visited = new Set<Node>();
    const dfs = (node: Node, prev?: Node): boolean => {
      visited.add(node);
      for (const neighbor of node.neighbours) {
        if (visited.has(neighbor)) {
          if (neighbor !== prev) {
            return false;
          }
        } else {
          if (!dfs(neighbor, node)) {
            return false;
          }
        }
      }
      return true;
    };

    // Also check that every node was visited.
    return dfs(nodes.get(0)!) && visited.size === nodes.size;
  }
}

new Solution().validTree(5, [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
]);
