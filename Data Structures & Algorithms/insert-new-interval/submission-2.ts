// You are given an array of non-overlapping intervals intervals where
// intervals[i] = [start_i, end_i] represents the start and the end time of the ith interval.
// intervals is initially sorted in ascending order by start_i.

// You are given another interval newInterval = [start, end].

// Insert newInterval into intervals such that intervals is still sorted in ascending order by start_i and also
// intervals still does not have any overlapping intervals.
// You may merge the overlapping intervals if needed.

// Return intervals after adding newInterval.

// You should aim for a solution with O(n) time and O(1) extra space, where n is the size of the input array.

class Solution {
  /**
   * @param {number[][]} intervals
   * @param {number[]} newInterval
   * @return {number[][]}
   */
  insert(intervals: number[][], newInterval: number[]): number[][] {
    // Trivial case.
    if (intervals.length === 0) {
      return [newInterval];
    }

    // New interval is entirely before any other.
    if (newInterval[1]! < intervals[0]![0]!) {
      intervals.splice(0, 0, newInterval);
      return intervals;
    }

    // New interval is entirely after any other.
    if (intervals[intervals.length - 1]![1]! < newInterval[0]!) {
      intervals.push(newInterval);
      return intervals;
    }

    // If we're here,
    // then we either have an overlap
    // or new interval neatly fits between intervals without any overlap.
    let overlapBegin = newInterval[0]!;
    let overlapEnd = newInterval[1]!;
    let i = 0;
    while (i < intervals.length) {
      const interval = intervals[i]!;

      // This interval is entirely before new interval, skip go next.
      if (interval[0]! < overlapBegin && interval[1]! < overlapBegin) {
        i++;
        continue;
      }

      // This interval is entirely after new interval, stop the scanning.
      if (interval[0]! > overlapEnd && interval[1]! > overlapEnd) {
        break;
      }

      // If we're here, then we're in overlap zone where old and new intervals overlap.
      // Update overlap markers as old and new intervals merge.
      // Remove old interval (inefficient but whatever) and keep scanning.
      overlapBegin = Math.min(overlapBegin, interval[0]!);
      overlapEnd = Math.max(overlapEnd, interval[1]!);
      intervals.splice(i, 1);
    }

    // If there were overlaps, then we removed old overlapping intervals and updated overlap markers.
    // Or there were no overlaps and new interval neatly fits between intervals without any overlap.
    // Index i points to where we found an interval that is entirely after updated new interval or at the end of the array.
    // Add the updated new interval here.
    intervals.splice(i, 0, [overlapBegin, overlapEnd]);
    return intervals;
  }
}
