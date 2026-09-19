// You are given an integer array heights where heights[i] represents the height of the ith bar.
// You may choose any two bars to form a container. Return the maximum amount of water a container can store.

class Solution {
  /**
   * @param {number[]} heights
   * @return {number}
   */
  maxArea(heights: number[]): number {
    let result = 0;
    let left = 0;
    let right = heights.length - 1;
    while (left < right) {
      let width = right - left;
      let height = Math.min(heights[left]!, heights[right]!);
      result = Math.max(result, height * width);
      if (heights[left]! <= heights[right]!) {
        left++;
      } else {
        right--;
      }
    }
    return result;
  }
}

const solution = new Solution();
solution.maxArea([1, 7, 2, 5, 4, 7, 3, 6]);
