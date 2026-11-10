// The n-queens puzzle is the problem of placing n queens on an n x n chessboard so that no two queens can attack each other.

// A queen in a chessboard can attack horizontally, vertically, and diagonally.

// Given an integer n, return all distinct solutions to the n-queens puzzle.

// Each solution contains a unique board layout where the queen pieces are placed. 'Q' indicates a queen and '.' indicates an empty space.

// You may return the answer in any order.

class Solution {
  /**
   * @param {number} n
   * @return {string[][]}
   */
  solveNQueens(n: number): string[][] {
    let processCalls = 0;
    let iterations = 0;
    let successfulPlacements = 0;
    let occupiedRowChecks = 0;
    let sameRowChecks = 0;

    const board = Array.from({ length: n }, () => Array(n).fill(0));

    const workDiagonals = (row: number, col: number, mod: number) => {
      const rmods = [-1, 1];
      const cmods = [-1, 1];
      for (const rmod of rmods) {
        for (const cmod of cmods) {
          let r = row;
          let c = col;
          while (0 <= r && r < n && 0 <= c && c < n) {
            board[r]![c]! = board[r]![c]! + mod;
            r = r + rmod;
            c = c + cmod;
          }
        }
      }
    };

    const workHorizontals = (row: number, col: number, mod: number) => {
      for (let i = 0; i < n; i++) {
        board[row]![i]! = board[row]![i]! + mod;
        board[i]![col]! = board[i]![col]! + mod;
      }
    };

    const addQ = (row: number, col: number): boolean => {
      if (board[row]![col]! === 0) {
        workDiagonals(row, col, 1);
        workHorizontals(row, col, 1);
        board[row]![col]! = 9;
        return true;
      } else {
        return false;
      }
    };

    const remQ = (row: number, col: number) => {
      if (board[row]![col]! === 9) {
        workDiagonals(row, col, -1);
        workHorizontals(row, col, -1);
        board[row]![col]! = 0;
      }
    };

    const result: string[][] = [];

    const print = () => {
      const subResult = [];
      for (let row = 0; row < n; row++) {
        let rowStr = "";
        for (let col = 0; col < n; col++) {
          rowStr += board[row]![col] === 9 ? "Q" : ".";
        }
        subResult.push(rowStr);
      }
      result.push(subResult);
    };

    const process = (queenLeft: number, row: number) => {
      processCalls++;

      if (queenLeft === 0) {
        print();
        return;
      }

      for (let col = 0; col < n; col++) {
        iterations++;
        if (board[row]![col]! !== 0) {
          occupiedRowChecks++;
        }
        if (addQ(row, col)) {
          successfulPlacements++;
          process(queenLeft - 1, row + 1);
          remQ(row, col);
        }
      }
    };

    process(n, 0);

    console.log({
      processCalls,
      iterations,
      successfulPlacements,
      occupiedRowChecks,
      sameRowChecks,
      solutions: result.length,
    });

    return result;
  }
}

new Solution().solveNQueens(8);
