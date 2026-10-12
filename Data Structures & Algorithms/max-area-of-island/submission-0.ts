// You are given a matrix grid where grid[i] is either a 0 (representing water) or 1 (representing land).

// An island is defined as a group of 1's connected horizontally or vertically.
// You may assume all four edges of the grid are surrounded by water.

// The area of an island is defined as the number of cells within the island.

// Return the maximum area of an island in grid. If no island exists, return 0.

// Recommended Time & Space Complexity
// You should aim for a solution with O(m * n) time and O(m * n) space,
// where m is the number of rows and n is the number of columns in the grid.

class Solution {
  /**
   * @param {number[][]} grid
   * @return {number}
   */
  maxAreaOfIsland(grid: number[][]): number {
    const visit = (row: number, col: number): number => {
      grid[row]![col]! = 2;
      let result = 1;
      if (row > 0 && grid[row - 1]![col]! === 1) {
        result += visit(row - 1, col);
      }
      if (col > 0 && grid[row]![col - 1]! === 1) {
        result += visit(row, col - 1);
      }
      if (row < grid.length - 1 && grid[row + 1]![col]! === 1) {
        result += visit(row + 1, col);
      }
      if (col < grid[0]!.length - 1 && grid[row]![col + 1]! === 1) {
        result += visit(row, col + 1);
      }
      return result;
    };

    // Scan until you find unvisited land ("1"). 
    // Mark this land as visited ("2"), set area 1.
    // Recursively check and mark every connected land (row + 1, row - 1, col + 1, col - 1).

    let maxArea = 0;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0]!.length; col++) {
        if (grid[row]![col]! === 1) {
          maxArea = Math.max(maxArea, visit(row, col));
        }
      }
    }
    return maxArea;
  }
}

new Solution().maxAreaOfIsland([
  [0, 1, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [0, 1, 1, 0, 1],
  [0, 1, 0, 0, 1],
]);
