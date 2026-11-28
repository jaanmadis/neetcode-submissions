type GraphEdge = {
  to: GraphNode;
};

type GraphNode = {
  val: number;
  edges: GraphEdge[];
  prerequisites: Set<GraphNode>;
};

class Solution {
  /**
   * @param {number} numCourses
   * @param {number[][]} prerequisites
   * @param {number[][]} queries
   * @return {boolean[]}
   */
  checkIfPrerequisite(
    numCourses: number,
    prerequisites: number[][],
    queries: number[][],
  ) {
    const result: boolean[] = [];
    const nodes = new Map<number, GraphNode>();
    for (let i = 0; i < numCourses; i++) {
      nodes.set(i, { val: i, edges: [], prerequisites: new Set<GraphNode>() });
    }
    for (const prerequisite of prerequisites) {
      const a = nodes.get(prerequisite[0]!)!;
      const b = nodes.get(prerequisite[1]!)!;
      a.edges.push({ to: b });
    }

    const topoSortResult: number[] = [];
    const visited = new Set<GraphNode>();
    const topoSort = (node: GraphNode) => {
      if (visited.has(node)) {
        return;
      }
      visited.add(node);
      for (const edge of node.edges) {
        topoSort(edge.to);
        node.prerequisites.add(edge.to);
        for (const prerequisite of edge.to.prerequisites) {
          node.prerequisites.add(prerequisite);
        }
      }
      topoSortResult.push(node.val);
    };
    for (const [key, value] of nodes) {
      topoSort(value);
    }
    topoSortResult.reverse();

    // nodes.forEach((node) => {
    //   console.log("--------------------");
    //   console.log(node.val);
    //   console.log("prereqs:");
    //   node.prerequisites.forEach((prerequisite) => console.log(prerequisite));
    // });

    for (const query of queries) {
      const node = nodes.get(query[0]!)!;
      result.push(node.prerequisites.has(nodes.get(query[1]!)!));
    }

    return result;
  }

  checkIfPrerequisite2(
    numCourses: number,
    prerequisites: number[][],
    queries: number[][],
  ) {
    const result: boolean[] = [];
    const nodes = new Map<number, GraphNode>();
    for (let i = 0; i < numCourses; i++) {
      nodes.set(i, { val: i, edges: [], prerequisites: new Set<GraphNode>() });
    }
    for (const prerequisite of prerequisites) {
      const a = nodes.get(prerequisite[0]!)!;
      const b = nodes.get(prerequisite[1]!)!;
      a.edges.push({ to: b });
    }

    const dfs = (node: GraphNode, target: GraphNode): boolean => {
      if (node === target) {
        return true;
      }
      for (const edge of node.edges) {
        if (dfs(edge.to, target)) {
          return true;
        }
      }
      return false;
    };

    for (const query of queries) {
      result.push(dfs(nodes.get(query[0]!)!, nodes.get(query[1]!)!));
    }

    return result;
  }
}