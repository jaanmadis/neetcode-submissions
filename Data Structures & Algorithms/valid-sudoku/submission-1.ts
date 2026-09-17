// You are given a 9 x 9 Sudoku board board. A Sudoku board is valid if the following rules are followed:

// Each row must contain the digits 1-9 without duplicates.
// Each column must contain the digits 1-9 without duplicates.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without duplicates.
// Return true if the Sudoku board is valid, otherwise return false

class Solution {
  /**
   * @param {character[][]} board
   * @return {boolean}
   */
  isValidSudoku(board: string[][]): boolean {
    const LEN = 9;
    const rows = Array.from({ length: LEN }, () => new Set<string>());
    const cols = Array.from({ length: LEN }, () => new Set<string>());
    const boxs = Array.from({ length: LEN }, () => new Set<string>());

    for (let row = 0; row < LEN; row++) {
      for (let col = 0; col < LEN; col++) {
        const value = board[row]![col]!;
        if (value === ".") {
          continue;
        }

        const box = Math.floor(col / 3) + Math.floor(row / 3) * 3;

        if (
          rows[row]?.has(value) ||
          cols[col]?.has(value) ||
          boxs[box]?.has(value)
        ) {
          return false;
        }

        rows[row]?.add(value);
        cols[col]?.add(value);
        boxs[box]?.add(value);
      }
    }
    return true;
  }
}
