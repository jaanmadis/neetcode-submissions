// Given an array of meeting time interval objects consisting of start and end times [[start_1,end_1],[start_2,end_2],...] (start_i < end_i),
// determine if a person could add all meetings to their schedule without any conflicts.
// The intervals may be provided in any order.

// Note: (0,8),(8,10) is not considered a conflict at 8

// You should aim for a solution with O(nlogn) time and O(n) space, where n is the size of the input array.

// class Interval {
//   start: number;
//   end: number;
//   constructor(start: number, end: number) {
//     this.start = start;
//     this.end = end;
//   }
// }

class Solution {
  /**
   * @param {Interval[]} intervals
   * @returns {boolean}
   */
  canAttendMeetings(intervals: Interval[]): boolean {
    intervals.sort((a: Interval, b: Interval) => a.start - b.start);
    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i - 1]!.end > intervals[i]!.start) {
        return false;
      }
    }
    return true;
  }
}

// new Solution().canAttendMeetings([
//   new Interval(0, 30),
//   new Interval(5, 10),
//   new Interval(15, 20),
// ]);
