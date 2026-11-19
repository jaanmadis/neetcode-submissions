// Given a square n x n matrix of integers matrix, rotate it by 90 degrees clockwise.
// You must rotate the matrix in-place. Do not allocate another 2D matrix and do the rotation.

class Solution {
  /**
   * @param {number[][]} matrix
   * @return {void}
   */
  rotate(matrix: number[][]): void {
    // Swap corners counterclockwise if position is 0
    // 1.3  7.3  7.3  7.1
    // ...  ...  ...  ...
    // 7.9  1.9  9.1  9.3
    //
    // Further elements if position is > 0
    // .2.  .4.  .4.  .4.
    // 4.6  2.6  8.6  8.2
    // .8.  .8.  .2.  .6.
    const swap = (
      r1: number,
      c1: number,
      r2: number,
      c2: number,
      position: number,
    ) => {
      let tmp: number;

      tmp = matrix[r2 - position]![c1]!;
      matrix[r2 - position]![c1]! = matrix[r1]![c1 + position]!;
      matrix[r1]![c1 + position]! = tmp;

      tmp = matrix[r2]![c2 - position]!;
      matrix[r2]![c2 - position]! = matrix[r2 - position]![c1]!;
      matrix[r2 - position]![c1]! = tmp;

      tmp = matrix[r1 + position]![c2]!;
      matrix[r1 + position]![c2]! = matrix[r2]![c2 - position]!;
      matrix[r2]![c2 - position]! = tmp;
    };

    // Start in the corner (0, 0).
    let r1 = 0;
    let c1 = 0;
    let r2 = matrix.length - 1;
    let c2 = matrix[0]!.length - 1;

    let position = 0;
    let limit = matrix.length - 1;

    while (limit > 0) {
      // Swap elements in every position.
      swap(r1, c1, r2, c2, position);
      position++;

      // Until we hit limit, then increase layer.
      if (position === limit) {
        position = 0;
        limit -= 2;

        // As layer increases start in the corner (1, 1).
        r1 += 1;
        c1 += 1;
        r2 -= 1;
        c2 -= 1;
      }
    }

    matrix.forEach((m) => console.log(m));
  }
}

new Solution().rotate([
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42],
  [43, 44, 45, 46, 47, 48, 49],
]);

new Solution().rotate([
  [1, 2],
  [3, 4],
]);

new Solution().rotate([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

new Solution().rotate([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
]);

new Solution().rotate([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
]);
