// You are given an array prerequisites where prerequisites[i] = [a, b]
// indicates that you must take course b first if you want to take course a.

// The pair [0, 1], indicates that must take course 1 before taking course 0.

// There are a total of numCourses courses you are required to take, labeled from 0 to numCourses - 1.

// Return true if it is possible to finish all courses, otherwise return false.

type GraphNode = {
  val: number;
  neighbors: GraphNode[];
  checked: boolean;
};

class Solution {
  dfsHasCycles(node: GraphNode, visited: Set<GraphNode>): boolean {
    if (node.checked) {
      return false;
    }

    if (visited.has(node)) {
      return true;
    }

    visited.add(node);

    for (const neighbor of node.neighbors) {
      if (this.dfsHasCycles(neighbor, visited)) {
        return true;
      }
    }

    visited.delete(node);
    node.checked = true;
    return false;
  }

  /**
   * @param {number} numCourses
   * @param {number[][]} prerequisites
   * @return {boolean}
   */
  canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const nodes: GraphNode[] = new Array(numCourses);
    for (let course = 0; course < numCourses; course++) {
      const node: GraphNode = { val: course, neighbors: [], checked: false };
      nodes[course] = node;
    }
    for (const prerequisite of prerequisites) {
      const wants = nodes[prerequisite[0]!]!;
      const wanted = nodes[prerequisite[1]!]!;
      wants.neighbors.push(wanted);
    }
    const visited = new Set<GraphNode>();
    for (const node of nodes) {
      if (this.dfsHasCycles(node, visited)) {
        return false;
      }
    }
    return true;
  }
}

new Solution().canFinish(8, [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [6, 0],
  [7, 0],
]);
