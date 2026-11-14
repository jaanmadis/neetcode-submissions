// You are given a 2D matrix matrix, handle multiple queries of the following type:

// Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
// Implement the NumMatrix class:

// NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.
// int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
// You must design an algorithm where sumRegion works on O(1) time complexity.

class NumMatrix {
  /**
   * @param {number[][]} matrix
   */
  private prefixSums: number[][] = [];

  constructor(matrix: number[][]) {
    for (let row = 0; row < matrix.length; row++) {
      let prefixes: number[] = [];
      for (let col = 0; col < matrix[0]!.length; col++) {
        let left = col > 0 ? prefixes[col - 1]! : 0;
        let top = row > 0 ? this.prefixSums[row - 1]![col]! : 0;
        let diag = col > 0 && row > 0 ? this.prefixSums[row - 1]![col - 1]! : 0;
        prefixes[col] = matrix[row]![col]! + left + top - diag;
      }
      this.prefixSums.push(prefixes);
    }
    this.prefixSums.forEach((p) => console.log(p));
  }

  /**
   * @param {number} row1
   * @param {number} col1
   * @param {number} row2
   * @param {number} col2
   * @return {number}
   */
  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    const sumTop = row1 > 0 ? this.prefixSums[row1 - 1]![col2]! : 0;
    const sumLeft = col1 > 0 ? this.prefixSums[row2]![col1 - 1]! : 0;
    const sumDiag =
      row1 > 0 && col1 > 0 ? this.prefixSums[row1 - 1]![col1 - 1]! : 0;
    return this.prefixSums[row2]![col2]! - sumTop - sumLeft + sumDiag;
  }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */

const numMatrix = new NumMatrix([
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
]);

numMatrix.sumRegion(2, 1, 4, 3);
