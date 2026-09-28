// You are given an m x n 2-D integer array matrix and an integer target.

// Each row in matrix is sorted in non-decreasing order.
// The first integer of every row is greater than the last integer of the previous row.
// Return true if target exists within matrix or false otherwise.

// Can you write a solution that runs in O(log(m * n)) time?

class Solution {
  /**
   * @param {number[][]} matrix
   * @param {number} target
   * @return {boolean}
   */
  searchMatrix(matrix: number[][], target: number): boolean {
    let left = 0;
    let right = matrix.length * matrix[0]!.length - 1;
    while (left <= right) {
      // Treat this like normal sorted array
      let curr = Math.floor((right - left) / 2) + left;
      // Map the current index into col and row
      let col = curr % matrix[0]!.length;
      let row = Math.floor(curr / matrix[0]!.length);
      // Normal binary search
      let value = matrix[row]![col]!;
      if (value === target) {
        return true;
      } else if (value < target) {
        left = curr + 1;
      } else if (value > target) {
        right = curr - 1;
      }
    }
    return false;
  }
}