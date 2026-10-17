// You are given a rectangular island heights where heights[r][c]
// represents the height above sea level of the cell at coordinate (r, c).

// The islands borders the Pacific Ocean from the top and left sides,
// and borders the Atlantic Ocean from the bottom and right sides.

// Water can flow in four directions (up, down, left, or right) from a cell to a neighboring cell with height equal or lower.
// Water can also flow into the ocean from cells adjacent to the ocean.

// Find all cells where water can flow from that cell to both the Pacific and Atlantic oceans.
// Return it as a 2D list where each element is a list [r, c] representing the row and column of the cell.
// You may return the answer in any order.

type Node = {
  col: number;
  row: number;
  height: number;
  atlantic: boolean;
  pacific: boolean;
};

class Solution {
  /**
   * @param {number[][]} heights
   * @return {number[][]}
   */
  pacificAtlantic(heights: number[][]): number[][] {
    const result: number[][] = [];

    const ROWS = heights.length;
    const COLS = heights[0]!.length;

    const atlanticQueue: Node[] = [];
    const pacificQueue: Node[] = [];

    const nodes: Node[][] = [];

    for (let row = 0; row < heights.length; row++) {
      const nodeRow = [];
      for (let col = 0; col < heights[0]!.length; col++) {
        const newNode: Node = {
          col,
          row,
          height: heights[row]![col]!,
          atlantic: false,
          pacific: false,
        };
        nodeRow.push(newNode);
        if (row === ROWS - 1 || (col === COLS - 1 && row !== ROWS - 1)) {
          atlanticQueue.push(newNode);
          newNode.atlantic = true;
        }
        if (row === 0 || (col === 0 && row !== 0)) {
          pacificQueue.push(newNode);
          newNode.pacific = true;
        }
      }
      nodes.push(nodeRow);
    }

    let atlanticIndex = 0;
    while (atlanticIndex < atlanticQueue.length) {
      const { col, row } = atlanticQueue[atlanticIndex]!;

      const process = (row: number, col: number) => {
        const nextNode = nodes[row]![col]!;
        if (
          nextNode.height >= atlanticQueue[atlanticIndex]!.height &&
          !nextNode.atlantic
        ) {
          nextNode.atlantic = true;
          atlanticQueue.push(nextNode);
        }
      };

      if (row > 0) {
        process(row - 1, col);
      }
      if (col > 0) {
        process(row, col - 1);
      }
      if (row < ROWS - 1) {
        process(row + 1, col);
      }
      if (col < COLS - 1) {
        process(row, col + 1);
      }

      atlanticIndex++;
    }

    let pacificIndex = 0;
    while (pacificIndex < pacificQueue.length) {
      const { col, row } = pacificQueue[pacificIndex]!;

      const process = (row: number, col: number) => {
        const nextNode = nodes[row]![col]!;
        if (
          nextNode.height >= pacificQueue[pacificIndex]!.height &&
          !nextNode.pacific
        ) {
          nextNode.pacific = true;
          pacificQueue.push(nextNode);
        }
      };

      if (row > 0) {
        process(row - 1, col);
      }
      if (col > 0) {
        process(row, col - 1);
      }
      if (row < ROWS - 1) {
        process(row + 1, col);
      }
      if (col < COLS - 1) {
        process(row, col + 1);
      }

      pacificIndex++;
    }

    for (let i = 0; i < pacificQueue.length; i++) {
      const node = pacificQueue[i]!;
      if (node.atlantic) {
        result.push([node.row, node.col]);
      }
    }

    return result;
  }
}

new Solution().pacificAtlantic([
  [1, 2, 3],
  [2, 2, 2],
  [3, 2, 1],
]);

// Your Output
// [[0,4],[1,3],           ,[3,0],[3,1],[4,0]]

// Expected Output
// [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
