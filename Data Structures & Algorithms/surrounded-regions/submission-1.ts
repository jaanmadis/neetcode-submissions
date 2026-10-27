// You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:
// Connect: A cell is connected to adjacent cells horizontally or vertically.
// Region: To form a region connect every 'O' cell. Regions can have any shape; they do not need to be squares or rectangles.
// Surround: A region is surrounded if none of the 'O' cells in that region are on the edge of the board.
// Such regions are completely enclosed by 'X' cells.
// To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.
// Recommended Time & Space Complexity
// You should aim for a solution with O(m * n) time and O(m * n) space, where m is the number of rows and n is the number of columns in the matrix.

class Solution {
  /**
   * @param {character[][]} board
   * @return {void} Do not return anything, modify board in-place instead.
   */
  solve(board: string[][]): void {
    const ROWS = board.length;
    const COLS = board[0]!.length;

    const notSurroundedOCells = [];
    const allOCells = [];

    // Find all O cells and also all O cells that are not-surrounded.
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (board[row]![col]! === "O") {
          allOCells.push({ row, col });
          if (0 === row || row === ROWS - 1 || 0 === col || col === COLS - 1) {
            notSurroundedOCells.push({ row, col });
          }
        }
      }
    }

    const addMoreNotSurrounded = (row: number, col: number) => {
      if (row < 0 || col < 0 || row === ROWS || col === COLS) {
        return;
      }
      if (board[row]![col]! === "O") {
        board[row]![col]! = "Z";
        addMoreNotSurrounded(row + 1, col);
        addMoreNotSurrounded(row - 1, col);
        addMoreNotSurrounded(row, col + 1);
        addMoreNotSurrounded(row, col - 1);
      }
    };

    // DFS and find all O cells connected to not-surrounded cells, mark these as Z for not-surrounded regions.
    for (let i = 0; i < notSurroundedOCells.length; i++) {
      addMoreNotSurrounded(
        notSurroundedOCells[i]!.row,
        notSurroundedOCells[i]!.col,
      );
    }

    // All other O-s are surrounded, change to Xs and replace Z-s with Os.
    for (let i = 0; i < allOCells.length; i++) {
      const { row, col } = allOCells[i]!;
      if (board[row]![col]! === "O") {
        board[row]![col]! = "X";
      } else if (board[row]![col]! === "Z") {
        board[row]![col]! = "O";
      }
    }
  }
}

new Solution().solve([
  ["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"],
]);
