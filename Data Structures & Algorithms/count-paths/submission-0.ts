// There is an m x n grid where you are allowed to move either down or to the right at any point in time.
// Given the two integers m and n,
// return the number of possible unique paths that can be taken from the top-left corner of the grid (grid[0][0])
// to the bottom-right corner (grid[m - 1][n - 1]).
// You may assume the output will fit in a 32-bit integer.

class Solution {
  /**
   * @param {number} m
   * @param {number} n
   * @return {number}
   */
  uniquePaths(m: number, n: number): number {
    const ROWS = m;
    const COLS = n;
    const grid = Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
    for (let i = 0; i < COLS; i++) {
      grid[ROWS - 1]![i] = 1;
    }
    for (let i = 0; i < ROWS; i++) {
      grid[i]![COLS - 1] = 1;
    }
    for (let i = ROWS - 2; i >= 0; i--) {
      for (let j = COLS - 2; j >= 0; j--) {
        grid[i]![j]! = grid[i + 1]![j]! + grid[i]![j + 1]!;
      }
    }
    return grid[0]![0]!;
  }
}

new Solution().uniquePaths(3, 6);
