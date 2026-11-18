class Solution {
  /**
   * @param {number[][]} intervals
   * @param {number[]} newInterval
   * @return {number[][]}
   */
  insert(intervals: number[][], newInterval: number[]): number[][] {
    if (intervals.length === 0) {
      return [newInterval];
    }

    if (newInterval[1]! < intervals[0]![0]!) {
      intervals.splice(0, 0, newInterval);
      return intervals;
    }

    if (intervals[intervals.length - 1]![1]! < newInterval[0]!) {
      intervals.push(newInterval);
      return intervals;
    }

    let overlapBegin = newInterval[0]!;
    let overlapEnd = newInterval[1]!;
    let i = 0;
    while (i < intervals.length) {
      const interval = intervals[i]!;
      if (interval[0]! < overlapBegin && interval[1]! < overlapBegin) {
        i++;
        continue;
      }
      if (interval[0]! > overlapEnd && interval[1]! > overlapEnd) {
        break;
        // intervals.splice(i, 0, [overlapBegin, overlapEnd]);
        // return intervals;
      }
      overlapBegin = Math.min(overlapBegin, interval[0]!);
      overlapEnd = Math.max(overlapEnd, interval[1]!);
      intervals.splice(i, 1);
    }

    intervals.splice(i, 0, [overlapBegin, overlapEnd]);
    return intervals;
  }
}
