// You are given an array prerequisites where prerequisites[i] = [a, b]
// indicates that you must take course b first if you want to take course a.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// There are a total of numCourses courses you are required to take, labeled from 0 to numCourses - 1.

// Return a valid ordering of courses you can take to finish all courses.
// If there are many valid answers, return any of them.
// If it's not possible to finish all courses, return an empty array.

type GraphNode = {
  val: number;
  neighbours: GraphNode[];
};

class Solution {
  /**
   * @param {number} numCourses
   * @param {number[][]} prerequisites
   * @return {number[]}
   */
  findOrder(numCourses: number, prerequisites: number[][]): number[] {
    // Build grpah
    const nodes = new Map<number, GraphNode>();
    for (let i = 0; i < numCourses; i++) {
      nodes.set(i, { val: i, neighbours: [] });
    }

    for (const prerequisite of prerequisites) {
      const from = nodes.get(prerequisite[0]!);
      const to = nodes.get(prerequisite[1]!);
      from!.neighbours.push(to!);
    }

    // Use dfs so find cycle in directed disjoined graph -- keep track of global visited and current recursion visited.
    const visited = new Set<GraphNode>();
    const current = new Set<GraphNode>();

    const dfsDisjointedHasCycles = (node: GraphNode): boolean => {
      if (visited.has(node)) {
        return false;
      }
      visited.add(node);
      current.add(node);
      for (const neighbour of node.neighbours) {
        if (current.has(neighbour) || dfsDisjointedHasCycles(neighbour)) {
          return true;
        }
      }
      current.delete(node);
      return false;
    };

    for (const value of nodes.values()) {
      if (dfsDisjointedHasCycles(value)) {
        return [];
      }
    }

    // Resturn result with dependants first

    visited.clear();
    const result: number[] = [];

    const addNode = (node: GraphNode) => {
      if (visited.has(node)) {
        return;
      }
      visited.add(node);
      for (const neighbour of node.neighbours) {
        addNode(neighbour);
      }
      result.push(node.val);
    };

    for (const value of nodes.values()) {
      addNode(value);
    }

    return result;
  }
}

new Solution().findOrder(3, [[1, 0]]);
