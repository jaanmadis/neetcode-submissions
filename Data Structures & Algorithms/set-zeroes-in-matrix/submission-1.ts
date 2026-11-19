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
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
]);
