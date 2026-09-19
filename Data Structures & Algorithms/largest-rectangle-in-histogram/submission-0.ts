// You are given an array of integers heights where heights[i] represents the height of a bar. The width of each bar is 1.

// Return the area of the largest rectangle that can be formed among the bars.

interface rect {
  height: number;
  width: number;
}

interface bar {
  height: number;
  index: number;
}

class Solution {
  /**
   * @param {number[]} heights
   * @return {number}
   */

  // this is O(n)
  largestRectangleArea(heights: number[]): number {
    let result = 0;
    const bars: bar[] = [];
    // Push extra zero value into heights, so that the stack will always get emptied in the loop
    heights.push(0);
    for (let i = 0; i < heights.length; i++) {
      let newIndex = i;
      // This bar is smaller than last bar in stack.
      // Pop all bars that are taller than this.
      // Calculate best results that the taller bars in stack can yield.
      while (bars.length > 0 && bars[bars.length - 1]!.height > heights[i]!) {
        let bar = bars.pop()!;
        result = Math.max(result, bar.height * (i - bar.index));
        // Add the new (shorter) bar with the index of the taller bar.
        // This allows the shorter bar to inherit the width.
        newIndex = bar.index;
      }
      bars.push({ height: heights[i]!, index: newIndex });
    }
    return result;
  }

  // this is O(n^2)
  largestRectangleArea2(heights: number[]): number {
    let result = 0;
    const rects: rect[] = [];
    for (let i = 0; i < heights.length; i++) {
      let height = heights[i]!;
      for (let j = 0; j <= i; j++) {
        height = Math.min(height, heights[i - j]!);
        let width = j + 1;
        rects.push({ height, width });
        result = Math.max(result, height * width);
      }
    }
    return result;
  }
}

const solution = new Solution();
solution.largestRectangleArea([2, 1, 5, 6, 2, 3]);
solution.largestRectangleArea([5, 4, 3, 1]);
solution.largestRectangleArea([5, 4, 3]);
solution.largestRectangleArea([7, 1, 7, 2, 2, 4]);
solution.largestRectangleArea([1, 3, 7]);
