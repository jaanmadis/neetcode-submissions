// You are given a square 2-D matrix of distinct integers grid where each integer grid[i][j] represents the elevation at position (i, j).

// Rain starts to fall at time = 0, which causes the water level to rise. At time t, the water level across the entire grid is t.

// You may swim either horizontally or vertically in the grid between two adjacent squares if the original elevation of both squares is less than or equal to the water level at time t.

// Starting from the top left square (0, 0), return the minimum amount of time it will take until it is possible to reach the bottom right square (n - 1, n - 1).

type GraphEdge = {
  to: GraphNode;
};

type GraphNode = {
  edges: GraphEdge[];
  val: number;
};

type MinHeapValue = {
  node: GraphNode;
  val: number;
};

class Solution {
  /**
   * @param {number[][]} grid
   * @return {number}
   */
  swimInWater(grid: number[][]): number {
    if (grid.length === 0) {
      return 0;
    }
    const begin = grid[0]![0]!;
    const end = grid[grid.length - 1]![grid[0]!.length - 1]!;
    let result = Math.max(begin, end);
    const nodes = new Map<number, GraphNode>();
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0]!.length; col++) {
        const val = grid[row]![col]!;
        nodes.set(val, { edges: [], val: Math.max(0, val - result) });
      }
    }
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0]!.length; col++) {
        const neighbours: number[] = [];
        if (row > 0) {
          neighbours.push(grid[row - 1]![col]!);
        }
        if (col > 0) {
          neighbours.push(grid[row]![col - 1]!);
        }
        if (row < grid.length - 1) {
          neighbours.push(grid[row + 1]![col]!);
        }
        if (col < grid[0]!.length - 1) {
          neighbours.push(grid[row]![col + 1]!);
        }
        const a = nodes.get(grid[row]![col]!)!;
        for (const neighbour of neighbours) {
          const b = nodes.get(neighbour)!;
          a.edges.push({ to: b });
        }
      }
    }

    // for (const [key, value] of nodes) {
    //   console.log("--");
    //   console.log(`value=${key}`);
    //   for (const edge of value.edges) {
    //     console.log(edge.to);
    //   }
    // }

    const minHeap: MinHeapValue[] = [
      { node: nodes.get(grid[0]![0]!)!, val: 0 },
    ];
    const distances = new Map<GraphNode, number>();
    while (minHeap.length > 0) {
      const curr = minHeap.pop()!;
      if (distances.has(curr.node)) {
        continue;
      }
      distances.set(curr.node, curr.val);
      for (const edge of curr.node.edges) {
        minHeap.push({ node: edge.to, val: Math.max(curr.val, edge.to.val) });
      }
      minHeap.sort((a, b) => b.val - a.val);
    }

    // for (const [key, value] of nodes) {
    //   console.log("--");
    //   console.log(`node in grid=${key}`);
    //   const distance = distances.get(value)!;
    //   console.log(`distance=${distance}`);
    // }

    result += distances.get(nodes.get(end)!)!;

    console.log(result);
    return result;
  }
}

new Solution().swimInWater([
  [0, 1, 2, 10],
  [9, 14, 4, 13],
  [12, 3, 8, 15],
  [11, 5, 7, 6],
]);

new Solution().swimInWater([
  [3, 2],
  [0, 1],
]);
