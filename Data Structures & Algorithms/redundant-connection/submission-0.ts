// You are given a connected undirected graph with n nodes labeled from 1 to n.
// Initially, it contained no cycles and consisted of n-1 edges.

// We have now added one additional edge to the graph.
// The edge has two different vertices chosen from 1 to n,
// and was not an edge that previously existed in the graph.

// The graph is represented as an array edges of
// length n where edges[i] = [ai, bi] represents an edge between nodes ai and bi in the graph.

// Return an edge that can be removed so that the graph is still a connected non-cyclical graph.
// If there are multiple answers, return the edge that appears last in the input edges.

type GraphNode = {
  val: number;
  neighbours: GraphNode[];
};

class Solution {
  /**
   * @param {number[][]} edges
   * @return {number[]}
   */
  findRedundantConnection(edges: number[][]): number[] {
    const nodes = new Map<number, GraphNode>();

    const getNode = (val: number): GraphNode => {
      let node = nodes.get(val);
      if (!node) {
        node = { val, neighbours: [] };
        nodes.set(val, node);
      }
      return node;
    };

    const dfs = (
      node: GraphNode,
      parent: GraphNode | null,
      visited: Set<GraphNode>,
    ) => {
      visited.add(node);
      for (const neighbour of node.neighbours) {
        if (visited.has(neighbour)) {
          if (neighbour !== parent) {
            return false;
          }
        } else {
          if (!dfs(neighbour, node, visited)) {
            return false;
          }
        }
      }
      return true;
    };

    for (const edge of edges) {
      const n0 = getNode(edge[0]!);
      const n1 = getNode(edge[1]!);
      n0.neighbours.push(n1);
      n1.neighbours.push(n0);
      if (!dfs(n0, null, new Set<GraphNode>())) {
        return edge;
      }
    }

    return [0, 0];
  }
}

new Solution().findRedundantConnection([
  [1, 2],
  [1, 3],
  [3, 4],
  [2, 4],
]);
