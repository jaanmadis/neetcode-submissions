// You are implementing a program to use as your calendar.
// We can add a new event if adding the event will not cause a double booking.
// A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).
// The event can be represented as a pair of integers startTime and endTime that represents a booking on the
// half-open interval [startTime, endTime), the range of real numbers x such that startTime <= x < endTime.
// Implement the MyCalendar class:
// MyCalendar() Initializes the calendar object.
// boolean book(int startTime, int endTime)
// Returns true if the event can be added to the calendar successfully without causing a double booking.
// Otherwise, return false and do not add the event to the calendar.

class MyCalendar {
  bookings: number[][] = [];
  constructor() {}

  /**
   * @param {number} startTime
   * @param {number} endTime
   * @return {boolean}
   */
  book(startTime: number, endTime: number): boolean {
    let i = 0;
    while (i < this.bookings.length) {
      if (
        this.bookings[i]![0]! < startTime &&
        this.bookings[i]![1]! <= startTime
      ) {
        i++;
      } else if (
        endTime <= this.bookings[i]![0]! &&
        endTime <= this.bookings[i]![1]!
      ) {
        break;
      } else {
        return false;
      }
    }
    this.bookings.splice(i, 0, [startTime, endTime]);
    return true;
  }
}

const mc = new MyCalendar();
mc.book(47, 50);
mc.book(33, 41);
mc.book(39, 45);
mc.book(33, 42);
mc.book(25, 32);
mc.book(26, 35);
mc.book(19, 25);
mc.book(3, 8);
mc.book(8, 13);
mc.book(18, 27);
