// You are given an array of integers temperatures where temperatures[i] represents the daily temperatures on the ith day.
// Return an array result where result[i] is the number of days after the ith day
// before a warmer temperature appears on a future day.
// If there is no day in the future where a warmer temperature will appear for the ith day,
// set result[i] to 0 instead.

interface daily {
  temp: number;
  index: number;
}

class Solution {
  /**
   * @param {number[]} temperatures
   * @return {number[]}
   */
  dailyTemperatures(temperatures: number[]): number[] {
    const result = Array(temperatures.length).fill(0);
    const stack: daily[] = [];

    // Start from then end
    for (let index = temperatures.length - 1; index >= 0; index--) {
      // Throw away temperatures that are colder than current temperature
      // because current temperature will be the "next warmer" for future records.
      while (
        stack.length > 0 &&
        temperatures[index]! >= stack[stack.length - 1]!.temp
      ) {
        stack.pop();
      }

      // Calculate the distance to "next warmer" from current index.
      result[index] =
        stack.length > 0 ? stack[stack.length - 1]!.index - index : 0;

      // Store current temperature for next iteration.
      stack.push({ temp: temperatures[index]!, index });
    }
    return result;
  }
}

const solution = new Solution();
solution.dailyTemperatures([30, 38, 30, 36, 35, 40, 28]);
