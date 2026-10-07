// Given a 2D grid grid where '1' represents land and '0' represents water,
// count and return the number of islands.

// An island is formed by connecting adjacent lands horizontally or vertically and is surrounded by water.
// You may assume water is surrounding the grid (i.e., all the edges are water).

class Solution {
  /**
   * @param {character[][]} grid
   * @return {number}
   */
  numIslands(grid: string[][]): number {
    let result = 0;

    const VISITED_ISLAND = "2";
    const UNVISITED_ISLAND = "1";

    const markAndCheck = (checkRow: number, checkCol: number) => {
      grid[checkRow]![checkCol] = VISITED_ISLAND;

      if (checkRow + 1 < grid.length) {
        if (grid[checkRow + 1]![checkCol] === UNVISITED_ISLAND) {
          markAndCheck(checkRow + 1, checkCol);
        }
      }
      if (0 <= checkRow - 1) {
        if (grid[checkRow - 1]![checkCol] === UNVISITED_ISLAND) {
          markAndCheck(checkRow - 1, checkCol);
        }
      }
      if (checkCol + 1 < grid[0]!.length) {
        if (grid[checkRow]![checkCol + 1] === UNVISITED_ISLAND) {
          markAndCheck(checkRow, checkCol + 1);
        }
      }
      if (0 <= checkCol - 1) {
        if (grid[checkRow]![checkCol - 1] === UNVISITED_ISLAND) {
          markAndCheck(checkRow, checkCol - 1);
        }
      }
    };

    // Scan until you find unvisited land ("1").
    // Increase result.
    // Mark this land as visited ("2"). 
    // Recursively check and mark every connected land (row + 1, row - 1, col + 1, col - 1).
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0]!.length; col++) {
        if (grid[row]![col] === UNVISITED_ISLAND) {
          markAndCheck(row, col);
          result++;
        }
      }
    }

    return result;
  }
}
