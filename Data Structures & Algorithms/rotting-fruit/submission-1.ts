// You are given a 2-D matrix grid. Each cell can have one of three possible values:

// 0 representing an empty cell
// 1 representing a fresh fruit
// 2 representing a rotten fruit
// Every minute, if a fresh fruit is horizontally or vertically adjacent to a rotten fruit, then the fresh fruit also becomes rotten.

// Return the minimum number of minutes that must elapse until there are zero fresh fruits remaining. If this state is impossible within the grid, return -1.

// You should aim for a solution with O(m * n) time and O(m * n) space, where m is the number of rows and n is the number of columns in the given grid.

type Location = { row: number; col: number; time: number };

class Solution {
  /**
   * @param {number[][]} grid
   * @return {number}
   */
  orangesRotting(grid: number[][]): number {
    if (grid.length === 0 || grid[0]?.length === 0) {
      return 0;
    }

    // Get all locations of rotting fruit and number of fresh fruit
    let fresh = 0;
    const locations: Location[] = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0]!.length; col++) {
        if (grid[row]![col]! === 1) {
          fresh++;
        } else if (grid[row]![col]! === 2) {
          locations.push({ row, col, time: 0 });
        }
      }
    }

    if (fresh === 0) {
      return 0;
    }

    let index = 0;
    while (index < locations.length) {
      const { row, col, time } = locations[index]!;

      if (row > 0 && grid[row - 1]![col]! == 1) {
        grid[row - 1]![col]! = 2;
        fresh--;
        locations.push({ row: row - 1, col, time: time + 1 });
      }

      if (col > 0 && grid[row]![col - 1]! == 1) {
        grid[row]![col - 1]! = 2;
        fresh--;
        locations.push({ row, col: col - 1, time: time + 1 });
      }

      if (row < grid.length - 1 && grid[row + 1]![col]! == 1) {
        grid[row + 1]![col]! = 2;
        fresh--;
        locations.push({ row: row + 1, col, time: time + 1 });
      }

      if (col < grid[0]!.length - 1 && grid[row]![col + 1]! == 1) {
        grid[row]![col + 1]! = 2;
        fresh--;
        locations.push({ row, col: col + 1, time: time + 1 });
      }

      if (fresh === 0) {
        return time + 1;
      }

      index++;
    }

    return -1;
  }
}

// new Solution().orangesRotting([
//   [1, 1, 0],
//   [0, 1, 1],
//   [0, 1, 2],
// ]);

new Solution().orangesRotting([[0, 2]]);
