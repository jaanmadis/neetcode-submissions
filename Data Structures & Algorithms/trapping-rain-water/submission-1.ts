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

    let leftTower = 0;
    let rightTower = 0;

    while (left <= right) {
      // Walk from left and right to center and keep track of highest towers
      // 0, 2, 0, 3, 1, 0, 1, 3, 2, 1
      //
      // leftTower = 0
      // rightTower = 1
      //
      // Then add the amount of water at the position of left (or right) pointer at the side of the smallest tower.
      // Advance pointer that's at the lowest tower.
      //
      // leftTower = 0
      // rightTower = 1
      // result = 0 + 0 (left pointer is at left tower, so nothing can be added)
      // left = 0 + 1
      // right = 9
      //
      // leftTower = 2
      // rightTower = 1
      // result = 0 + 0 (right pointer is at right tower, so nothing can be added)
      // left = 1
      // right = 9 - 1
      //
      // leftTower = 2
      // rightTower = 2
      // result = 0 + 0 (left pointer is at left tower, so nothing can be added)
      // left = 1 + 1
      // right = 8
      //
      // leftTower = 2
      // rightTower = 2
      //
      // Now, when left pointer is at 2 we can add 2 water.
      // This is because left tower at position 1 is height 2 and height at left pointer is lower than the tower.
      // And because leftTower <= rightTower, then no matter what happens further towards center,
      // there has to be a right tower with height of 2 or more.
      // So adding 2 water here at left pointer position is possible.
      //
      // result = 0 + 2
      // left = 2 + 1
      // right = 8

      leftTower = Math.max(leftTower, height[left]!);
      rightTower = Math.max(rightTower, height[right]!);
      if (leftTower <= rightTower) {
        result += leftTower - height[left]!;
        left++;
      } else {
        result += rightTower - height[right]!;
        right--;
      }
    }

    return result;
  }

  trap2(height: number[]): number {
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

new Solution().trap([0, 2, 0, 3, 1, 0, 1, 3, 2, 1]);
