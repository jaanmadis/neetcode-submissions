// You are given an n x n binary matrix grid,
// return the length of the shortest clear path in the matrix.
// If there is no clear path, return -1.

// A clear path in a binary matrix is a path from the
// top-left cell (i.e., (0, 0)) to the
// bottom-right cell (i.e., (n - 1, n - 1)) such that:

// All the visited cells of the path are 0.
// All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).

// The length of a clear path is the number of visited cells of this path.

type Position = {
  row: number;
  col: number;
  steps: number;
};

class Solution {
  /**
   * @param {number[][]} grid
   * @return {number}
   */
  shortestPathBinaryMatrix(grid: number[][]): number {
    const ROWS = grid.length;
    const COLS = grid[0]!.length;
    const VISITED = 2;
    const UNVISITED = 0;

    if (grid[0]![0]! !== 0) {
      return -1;
    }

    const bfsQueue: Position[] = [{ row: 0, col: 0, steps: 1 }];

    const addToQueue = (row: number, col: number, steps: number) => {
      if (
        row < 0 ||
        col < 0 ||
        row >= ROWS ||
        col >= COLS ||
        grid[row]![col]! !== UNVISITED
      ) {
        return;
      }
      bfsQueue.push({ row, col, steps: steps + 1 });
    };

    while (bfsQueue.length !== 0) {
      const { row, col, steps } = bfsQueue.shift()!;
      grid[row]![col]! = VISITED;
      if (row === ROWS - 1 && col === COLS - 1) {
        return steps;
      }

      addToQueue(row - 1, col, steps);
      addToQueue(row - 1, col - 1, steps);
      addToQueue(row, col - 1, steps);
      addToQueue(row + 1, col - 1, steps);
      addToQueue(row + 1, col, steps);
      addToQueue(row + 1, col + 1, steps);
      addToQueue(row, col + 1, steps);
      addToQueue(row - 1, col + 1, steps);
    }

    return -1;
  }
}

new Solution().shortestPathBinaryMatrix([
  [0, 0, 0],
  [1, 1, 0],
  [1, 1, 0],
]);
