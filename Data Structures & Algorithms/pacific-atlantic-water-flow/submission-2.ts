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
  explored: boolean;
};

class Solution {
  /**
   * @param {number[][]} heights
   * @return {number[][]}
   */
  pacificAtlantic(heights: number[][]): number[][] {
    const result: number[][] = [];

    const nodes: Node[][] = [];
    for (let row = 0; row < heights.length; row++) {
      const nodeRow = [];
      for (let col = 0; col < heights[0]!.length; col++) {
        const newNode = {
          col,
          row,
          height: heights[row]![col]!,
          atlantic: row === heights.length - 1 || col == heights[0]!.length - 1,
          pacific: row === 0 || col === 0,
          explored: false,
        };
        nodeRow.push(newNode);
      }
      nodes.push(nodeRow);
    }

    const explore = (node: Node): { atlantic: boolean; pacific: boolean } => {
      const { row, col, atlantic, pacific, explored } = node;

      if (explored) {
        return { atlantic, pacific };
      }
      node.explored = true;

      let newAtlantic = atlantic;
      let newPacific = pacific;

      const process = (row: number, col: number) => {
        if (!newAtlantic || !newPacific) {
          if (nodes[row]![col]!.height <= node.height) {
            const { atlantic, pacific } = explore(nodes[row]![col]!);
            newAtlantic = newAtlantic || atlantic;
            newPacific = newPacific || pacific;
          }
        }
      };

      if (row > 0) {
        process(row - 1, col);
      }
      if (col > 0) {
        process(row, col - 1);
      }
      if (row < nodes.length - 1) {
        process(row + 1, col);
      }
      if (col < nodes[0]!.length - 1) {
        process(row, col + 1);
      }

      node.atlantic = newAtlantic;
      node.pacific = newPacific;

      if (newAtlantic && newPacific) {
        result.push([node.row, node.col]);
      }

      return {
        atlantic: newAtlantic,
        pacific: newPacific,
      };
    };

    for (let row = 0; row < nodes.length; row++) {
      for (let col = 0; col < nodes[0]!.length; col++) {
        explore(nodes[row]![col]!);
      }
    }

    return result;
  }
}

new Solution().pacificAtlantic([
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
]);

// Your Output
// [[0,4],[1,3],           ,[3,0],[3,1],[4,0]]

// Expected Output
// [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
