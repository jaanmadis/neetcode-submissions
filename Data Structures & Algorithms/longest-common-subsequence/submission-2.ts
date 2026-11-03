// Given two strings text1 and text2,
// return the length of the longest common subsequence between the two strings if one exists, otherwise return 0.

// A subsequence is a sequence that can be derived from the given sequence by deleting some or no elements without
// changing the relative order of the remaining characters.

// For example, "cat" is a subsequence of "crabt".
// A common subsequence of two strings is a subsequence that exists in both strings.

class Solution {
  /**
   * @param {string} text1
   * @param {string} text2
   * @return {number}
   */
  longestCommonSubsequence(text1: string, text2: string): number {
    const ROWS = text1.length;
    const COLS = text2.length;
    const grid: number[][] = [];
    for (let i = 0; i < ROWS; i++) {
      grid.push(new Array(COLS).fill(0));
    }

    let row = 0;
    while (row < ROWS) {
      let col = 0;
      while (col < COLS) {
        const above = row > 0 ? grid[row - 1]![col]! : 0;
        const left = col > 0 ? grid[row]![col - 1]! : 0;
        const diagonal = row > 0 && col > 0 ? grid[row - 1]![col - 1]! : 0;
        grid[row]![col]! =
          text1.charAt(row) === text2.charAt(col)
            ? diagonal + 1
            : Math.max(above, left);
        col++;
      }
      row++;
    }

    return grid[ROWS - 1]![COLS - 1]!;
  }
}

new Solution().longestCommonSubsequence("bsbininm", "jmjkbkjkv");
