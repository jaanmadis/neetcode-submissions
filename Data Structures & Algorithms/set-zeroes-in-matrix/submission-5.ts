// Given an m x n matrix of integers matrix, if an element is 0, set its entire row and column to 0's.
// You must update the matrix in-place.
// Follow up: Could you solve it using O(1) space?

class Solution {
  /**
   * @param {number[][]} matrix
   * @return {void}
   */
  setZeroes(matrix: number[][]): void {
    const ROWS = matrix.length;
    const COLS = matrix[0]!.length;

    let firstRowZero = false;
    let firstColZero = false;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (matrix[row]![col]! === 0) {
          if (row === 0) {
            firstRowZero = true;
          }
          if (col === 0) {
            firstColZero = true;
          }
          if (row !== 0 && col !== 0) {
            matrix[row]![0]! = 0;
            matrix[0]![col]! = 0;
          }
        }
      }
    }

    for (let row = 1; row < ROWS; row++) {
      if (matrix[row]![0]! === 0) {
        for (let col = 0; col < COLS; col++) {
          matrix[row]![col]! = 0;
        }
      }
    }

    for (let col = 1; col < COLS; col++) {
      if (matrix[0]![col]! === 0) {
        for (let row = 0; row < ROWS; row++) {
          matrix[row]![col]! = 0;
        }
      }
    }

    if (firstRowZero) {
      for (let col = 0; col < COLS; col++) {
        matrix[0]![col]! = 0;
      }
    }

    if (firstColZero) {
      for (let row = 0; row < ROWS; row++) {
        matrix[row]![0]! = 0;
      }
    }
  }

  setZeroes2(matrix: number[][]): void {
    const ROWS = matrix.length;
    const COLS = matrix[0]!.length;

    const PLACEHOLDER = Infinity;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (matrix[row]![col]! === 0) {
          for (let i = 0; i < COLS; i++) {
            if (matrix[row]![i] !== 0) {
              matrix[row]![i] = PLACEHOLDER;
            }
          }
          for (let i = 0; i < ROWS; i++) {
            if (matrix[i]![col] !== 0) {
              matrix[i]![col] = PLACEHOLDER;
            }
          }
        }
      }
    }

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (matrix[row]![col]! === PLACEHOLDER) {
          matrix[row]![col]! = 0;
        }
      }
    }
  }
}

new Solution().setZeroes([
  [1, 2, 3, 4],
  [5, 0, 7, 8],
  [0, 10, 11, 12],
  [13, 14, 15, 0],
]);
