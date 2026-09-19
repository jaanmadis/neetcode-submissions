// You are given an array of non-negative integers height which represent an elevation map.
// Each value height[i] represents the height of a bar, which has a width of 1.
// Return the total amount of water that can be trapped between the bars.

class Solution {
  /**
   * @param {number[]} height
   * @return {number}
   */
  trap(height: number[]): number {
    let result = 0;

    let left = 0;
    let right = height.length - 1;

    let bestLeft = 0;
    let bestRight = 0;

    while (left <= right) {
      bestLeft = Math.max(bestLeft, height[left]!);
      bestRight = Math.max(bestRight, height[right]!);

      if (bestLeft <= bestRight) {
        result += bestLeft - height[left]!;
        left++;
      } else {
        result += bestRight - height[right]!;
        right--;
      }
    }

    return result;
  }
}
