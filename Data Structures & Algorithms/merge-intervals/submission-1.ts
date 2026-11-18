// Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals,
// and return an array of the non-overlapping intervals that cover all the intervals in the input.

// You may return the answer in any order.

class Solution {
  /**
   * @param {number[][]} intervals
   * @return {number[][]}
   */
  merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0]! - b[0]!);
    let i = 1;
    while (i < intervals.length) {
      const prev = intervals[i - 1]!;
      const curr = intervals[i]!;
      if (prev[1]! < curr[0]!) {
        i++;
        continue;
      }
      prev[0] = Math.min(prev[0]!, curr[0]!);
      prev[1] = Math.max(prev[1]!, curr[1]!);
      intervals.splice(i, 1);
    }
    return intervals;
  }
}

new Solution().merge([
  [1, 4],
  [2, 3],
]);
