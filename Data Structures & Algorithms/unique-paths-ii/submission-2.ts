// You are given an m x n integer array grid.
// There is a robot initially located at the top-left corner (i.e., grid[0][0]).
// The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]).
// The robot can only move either down or right at any point in time.

// An obstacle and space are marked as 1 or 0 respectively in grid.
// A path that the robot takes cannot include any square that is an obstacle.

// Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The testcases are generated so that the answer will be less than or equal to 2 * (10^9).

class Solution {
  /**
   * @param {number[][]} grid
   * @return {number}
   */
  uniquePathsWithObstacles(grid: number[][]): number {
    const BLOCKER = 1;
    const NEW_BLOCKER = -1;

    if (grid.length === 0 || grid[0]![0]! === BLOCKER) {
      return 0;
    }

    const ROWS = grid.length;
    const COLS = grid[0]!.length;

    // If there is a blocker in the final row, then all cells to the left are dead ends.
    let blockedFinalRow = false;
    for (let i = COLS - 1; i >= 0; i--) {
      blockedFinalRow = blockedFinalRow || grid[ROWS - 1]![i] === BLOCKER;
      if (blockedFinalRow) {
        grid[ROWS - 1]![i] = BLOCKER;
      }
    }

    // If there is a blocker in the final col, then all cells to the up are dead ends.
    let blockedFinalCol = false;
    for (let i = ROWS - 1; i >= 0; i--) {
      blockedFinalCol = blockedFinalCol || grid[i]![COLS - 1] === BLOCKER;
      if (blockedFinalCol) {
        grid[i]![COLS - 1] = BLOCKER;
      }
    }

    // Write "1"-s to all cells in last row and last column, except blockers.
    // Replace blockers with NEW_BLOCKER.
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (grid[i]![j]! === BLOCKER) {
          grid[i]![j]! = NEW_BLOCKER;
        } else if (i === ROWS - 1 || j === COLS - 1) {
          grid[i]![j]! = 1;
        }
      }
    }

    // Run 2d DP
    for (let i = ROWS - 2; i >= 0; i--) {
      for (let j = COLS - 2; j >= 0; j--) {
        if (grid[i]![j]! === NEW_BLOCKER) {
          continue;
        }
        const rowBelow = grid[i + 1]![j]!;
        const colRight = grid[i]![j + 1]!;
        grid[i]![j]! =
          (rowBelow === NEW_BLOCKER ? 0 : rowBelow) +
          (colRight === NEW_BLOCKER ? 0 : colRight);
      }
    }

    return grid[0]![0]!;
  }
}
