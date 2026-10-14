// Given a node in a connected undirected graph, return a deep copy of the graph.
// Each node in the graph contains an integer value and a list of its neighbors.

// class Node {
//     public int val;
//     public List<Node> neighbors;
// }

// The graph is shown in the test cases as an adjacency list.
// An adjacency list is a mapping of nodes to lists, used to represent a finite graph.
// Each list describes the set of neighbors of a node in the graph.
// For simplicity, nodes values are numbered from 1 to n, where n is the total number of nodes in the graph.
// The index of each node within the adjacency list is the same as the node's value (1-indexed).
// The input node will always be the first node in the graph and have 1 as the value.

// 0 <= The number of nodes in the graph <= 100.
// 1 <= Node.val <= 100
// There are no duplicate edges and no self-loops in the graph.

// Definition for a Node.
// class Node {
//   val: number;
//   neighbors: Node[];

//   constructor(val = 0, neighbors: Node[] = []) {
//     this.val = val;
//     this.neighbors = neighbors;
//   }
// }

class Solution {
  /**
   * @param {Node} node
   * @return {Node}
   */
  cloneGraph(node: Node | null): Node | null {
    if (!node) {
      return null;
    }

    // Maintain a map of nodes, original to clone.
    const nodeMap = new Map<Node, Node>();

    // Recursively clone nodes.
    const getClone = (original: Node): Node => {
      // If we already have a clone, then return it.
      if (nodeMap.has(original)) {
        return nodeMap.get(original)!;
      }

      // Create new clone and map original to clone.
      const clone = new Node(original.val);
      nodeMap.set(original, clone);

      // Walk through original neighbors and push copies of neighbors into clone's neighbors array.
      for (const neighbor of original.neighbors) {
        clone.neighbors.push(getClone(neighbor));
      }

      // Return the clone.
      return clone;
    };

    return getClone(node);
  }
}

// const n1 = new Node(1);
// const n2 = new Node(2);
// const n3 = new Node(3);
// n1.neighbors = [n2];
// n2.neighbors = [n1, n3];
// n3.neighbors = [n2];

// new Solution().cloneGraph(n1);
