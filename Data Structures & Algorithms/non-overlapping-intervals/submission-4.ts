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
      // If we find an overlap
      if (prev[1]! > curr[0]!) {
        // Remove the one that ends later, or in other words keep the one that ends sooner.
        if (prev[1]! > curr[1]!) {
          // Previous ends later, "delete" it by making it the same as Current.
          // Splice would work, but it is too slow.
          prev[0] = curr[0]!;
          prev[1] = curr[1]!;
        } else {
          // Current ends later, "delete" it by making it the same as Previous.
          // Splice would work, but it is too slow.
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
