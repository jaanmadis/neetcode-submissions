// Given an m x n matrix of integers matrix, return a list of all elements within the matrix in spiral order.

class Solution {
  /**
   * @param {number[][]} matrix
   * @return {number[]}
   */
  spiralOrder(matrix: number[][]): number[] {
    const result = [];

    let topRowLimit = 0;
    let bottomRowLimit = matrix.length - 1;
    let leftColLimit = 0;
    let rightColLimit = matrix[0]!.length - 1;

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    let directionIndex = 0;
    let direction = directions[directionIndex]!;

    let row = 0;
    let col = 0;
    while (topRowLimit <= bottomRowLimit && leftColLimit <= rightColLimit) {
      result.push(matrix[row]![col]!);
      if (direction[1]! > 0) {
        if (col >= rightColLimit) {
          directionIndex = (directionIndex + 1) % 4;
          direction = directions[directionIndex]!;
          topRowLimit++;
        }
      } else if (direction[0]! > 0) {
        if (row >= bottomRowLimit) {
          directionIndex = (directionIndex + 1) % 4;
          direction = directions[directionIndex]!;
          rightColLimit--;
        }
      } else if (direction[1]! < 0) {
        if (col <= leftColLimit) {
          directionIndex = (directionIndex + 1) % 4;
          direction = directions[directionIndex]!;
          bottomRowLimit--;
        }
      } else if (direction[0]! < 0) {
        if (row <= topRowLimit) {
          directionIndex = (directionIndex + 1) % 4;
          direction = directions[directionIndex]!;
          leftColLimit++;
        }
      }
      row += direction[0]!;
      col += direction[1]!;
    }
    return result;
  }
}

new Solution().spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]);
