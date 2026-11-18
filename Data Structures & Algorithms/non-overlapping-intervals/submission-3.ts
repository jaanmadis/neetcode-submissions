// Given an array of intervals intervals where intervals[i] = [start_i, end_i],
// return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

class Solution {
  /**
   * @param {number[][]} intervals
   * @return {number}
   */
  eraseOverlapIntervals(intervals: number[][]): number {
    let removed = 0;
    intervals.sort((a, b) => a[0]! - b[0]!);
    let i = 1;
    while (i < intervals.length) {
      const prev = intervals[i - 1]!;
      const curr = intervals[i]!;
      if (prev[1]! > curr[0]!) {
        if (prev[1]! > curr[1]!) {
          prev[0] = curr[0]!;
          prev[1] = curr[1]!;
        } else {
          curr[0] = prev[0]!;
          curr[1] = prev[1]!;
        }
        removed++;
      }
      i++;
    }
    return removed;
  }
}
