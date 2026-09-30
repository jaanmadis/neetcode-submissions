// You are given an array of length n which was originally sorted in ascending order.
// It has now been rotated between 1 and n times. For example, the array nums = [1,2,3,4,5,6] might become:

// [3,4,5,6,1,2] if it was rotated 4 times.
// [1,2,3,4,5,6] if it was rotated 6 times.
// Notice that rotating the array 4 times moves the last four elements of the array to the beginning.
// Rotating the array 6 times produces the original array.

// Assuming all elements in the rotated sorted array nums are unique, return the minimum element of this array.

// A solution that runs in O(n) time is trivial, can you write an algorithm that runs in O(log n) time?

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  findMin(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;
    let result = nums[0]!;
    // Rotation splits the array into "larger numbers" and "smaller numbers" sub-arrays.
    while (left <= right) {
      // If we have a sorted array between our left and right, then the smallest value is the leftmost value.
      if (nums[left]! < nums[right]!) {
        return Math.min(result, nums[left]!);
      }

      const curr = left + Math.floor((right - left) / 2);
      // Keep current value as candidate result.
      result = Math.min(result, nums[curr]!);

      // [456|123]
      // If current is larger or equal than leftmost value, then we're in the "larger numbers" sub-array,
      // else we're in "smaller numbers" sub-array.
      if (nums[curr]! >= nums[left]!) {
        left = curr + 1;
      } else {
        right = curr - 1;
      }
    }
    return result;
  }
}

new Solution().findMin([9, -5, -2, 0, 3]);
