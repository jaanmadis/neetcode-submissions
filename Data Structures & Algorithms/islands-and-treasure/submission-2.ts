// You are given a m × n 2D grid initialized with these three possible values:

// -1 - A water cell that can not be traversed.
// 0 - A treasure chest.
// INF - A land cell that can be traversed. We use the integer 2^31 - 1 = 2147483647 to represent INF.

// Fill each land cell with the distance to its nearest treasure chest.
// If a land cell cannot reach a treasure chest then the value should remain INF.

// Assume the grid can only be traversed up, down, left, or right.

// Modify the grid in-place.

// You should aim for a solution with O(m * n) time and O(m * n) space, where m is the number of rows and n is the number of columns in the given grid.

type Location = { row: number; col: number };

class Solution {
  /**
   * @param {number[][]} grid
   */
  islandsAndTreasure(grid: number[][]): void {
    if (grid.length === 0 || grid[0]!.length === 0) {
      return;
    }

    const locations: Location[] = [];

    // Get all treasures.
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0]!.length; col++) {
        if (grid[row]![col]! === 0) {
          locations.push({ row, col });
        }
      }
    }

    let index = 0;
    while (index < locations.length) {
      const { row, col } = locations[index]!;
      const newDistance = grid[row]![col]! + 1;

      // Explore adjacent.
      if (row > 0) {
        if (grid[row - 1]![col]! === 2147483647) {
          grid[row - 1]![col]! = newDistance;
          locations.push({ row: row - 1, col });
        }
      }
      if (col > 0) {
        if (grid[row]![col - 1]! === 2147483647) {
          grid[row]![col - 1]! = newDistance;
          locations.push({ row, col: col - 1 });
        }
      }
      if (row < grid.length - 1) {
        if (grid[row + 1]![col]! === 2147483647) {
          grid[row + 1]![col]! = newDistance;
          locations.push({ row: row + 1, col });
        }
      }
      if (col < grid[0]!.length - 1) {
        if (grid[row]![col + 1]! === 2147483647) {
          grid[row]![col + 1]! = newDistance;
          locations.push({ row, col: col + 1 });
        }
      }

      index++;
    }

    // // Recursively explore.
    // const explore = (row: number, col: number, distance: number) => {
    //   // Return if water.
    //   if (grid[row]![col]! === -1) {
    //     return;
    //   }

    //   // Return if already closer to some other treasure.
    //   if (grid[row]![col]! < distance) {
    //     return;
    //   }

    //   // Update distance.
    //   grid[row]![col]! = distance;
    //   const newDistance = distance + 1;

    //   // Explore adjacent.
    //   if (row > 0) {
    //     explore(row - 1, col, newDistance);
    //   }
    //   if (col > 0) {
    //     explore(row, col - 1, newDistance);
    //   }
    //   if (row < grid.length - 1) {
    //     explore(row + 1, col, newDistance);
    //   }
    //   if (col < grid[0]!.length - 1) {
    //     explore(row, col + 1, newDistance);
    //   }
    // };

    // // Explore all treasures.
    // for (const treasure of treasures) {
    //   explore(treasure.row, treasure.col, 0);
    // }
  }
}

new Solution().islandsAndTreasure([
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647],
]);
