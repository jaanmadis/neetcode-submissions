// Given a 2-D grid of characters board and a string word, return true if the word is present in the grid, otherwise return false.
// For the word to be present it must be possible to form it with a path in the board with horizontally or vertically neighboring cells.
// The same cell may not be used more than once in a word.

class Solution {
  /**
   * @param {character[][]} board
   * @param {string} word
   * @return {boolean}
   */
  exist(board: string[][], word: string): boolean {
    // Explore in all possible directions.
    // Mark the current cell with illegal character to prevent re-use and restore it when backtracking.
    const explore = (row: number, col: number, substr: string) => {
      const directions: { row: number; col: number }[] = [];

      if (row > 0) {
        directions.push({ row: row - 1, col });
      }
      if (col > 0) {
        directions.push({ row, col: col - 1 });
      }
      if (row < board.length - 1) {
        directions.push({ row: row + 1, col });
      }
      if (col < board[0]!.length - 1) {
        directions.push({ row, col: col + 1 });
      }

      const lookFor = substr.substring(1);

      for (const direction of directions) {
        if (board[direction.row]![direction.col]! === lookFor.charAt(0)) {
          board[row]![col]! = "~";
          if (
            lookFor.length === 1 ||
            explore(direction.row, direction.col, lookFor)
          ) {
            return true;
          }
          board[row]![col]! = substr.charAt(0);
        }
      }

      return false;
    };

    if (word.length > board.length * board[0]!.length) {
      return false;
    }

    // Find an entry points in the grid and explore.
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0]!.length; col++) {
        if (board[row]![col]! === word.charAt(0)) {
          if (word.length === 1 || explore(row, col, word)) {
            return true;
          }
        }
      }
    }

    return false;
  }
}

new Solution().exist(
  [
    ["A", "B", "C", "E"],
    ["S", "F", "E", "S"],
    ["A", "D", "E", "E"],
  ],
  "ABCESEEEFS",
);
