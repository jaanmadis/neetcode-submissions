// You are given an image represented by an m x n grid of integers image,
// where image[i][j] represents the pixel value of the image.
// You are also given three integers sr, sc, and color.
// Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].

// To perform a flood fill:

// Begin with the starting pixel and change its color to color.
// Perform the same process for each pixel that is directly adjacent
// (pixels that share a side with the original pixel, either horizontally or vertically)
// and shares the same color as the starting pixel.
// Keep repeating this process by checking neighboring pixels of the updated pixels and modifying their color
// if it matches the original color of the starting pixel.
// The process stops when there are no more adjacent pixels of the original color to update.
// Return the modified image after performing the flood fill.

class Solution {
  /**
   * @param {number[][]} image
   * @param {number} sr
   * @param {number} sc
   * @param {number} color
   * @return {number[][]}
   */
  floodFill(
    image: number[][],
    sr: number,
    sc: number,
    color: number,
  ): number[][] {
    const ROWS = image.length;
    const COLS = image[0]!.length;
    const oldColor = image[sr]![sc]!;

    const fill = (row: number, col: number) => {
      if (
        row < 0 ||
        col < 0 ||
        row === ROWS ||
        col === COLS ||
        image[row]![col]! !== oldColor
      ) {
        return;
      }

      image[row]![col]! = color;

      fill(row - 1, col);
      fill(row, col - 1);
      fill(row + 1, col);
      fill(row, col + 1);
    };

    if (oldColor !== color) {
      fill(sr, sc);
    }

    return image;
  }
}

new Solution().floodFill(
  [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ],
  1,
  1,
  2,
);
