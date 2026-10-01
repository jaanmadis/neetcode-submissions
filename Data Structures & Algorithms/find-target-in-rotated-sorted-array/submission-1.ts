// You are given an array of length n which was originally sorted in ascending order.
// It has now been rotated between 1 and n times. For example, the array nums = [1,2,3,4,5,6] might become:

// [3,4,5,6,1,2] if it was rotated 4 times.
// [1,2,3,4,5,6] if it was rotated 6 times.
// Given the rotated sorted array nums and an integer target, return the index of target within nums, or -1 if it is not present.

// You may assume all elements in the sorted rotated array nums are unique,

// A solution that runs in O(n) time is trivial, can you write an algorithm that runs in O(log n) time?

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      const currIndex = left + Math.floor((right - left) / 2);
      const currNumber = nums[currIndex]!;
      if (currNumber === target) {
        return currIndex;
      }

      // If (curr) is in "smaller" and [target] is in "smaller" and target number is larger -> move left boundary
      // 5 6 7 8 1 (2) [3] 4

      // If (curr) is in "smaller" and [target] is in "smaller" and target number is smaller -> move right boundary
      // 5 6 7 8 [1] (2) 3 4

      // If (curr) is in "smaller" and [target] is in "larger" -> move right boundary
      // 5 6 7 [8] 1 (2) 3 4

      // If (curr) is in "larger" and [target] is in "larger" and target number is larger -> move left boundary
      // 5 6 (7) [8] 1 2 3 4

      // If (curr) is in "larger" and [target] is in "larger" and target number is smaller -> move right boundary
      // 5 [6] (7) 8 1 2 3 4

      // If (curr) is in "larger" and [target] is in "smaller" -> left right boundary
      // 5 6 (7) 8 [1] 2 3 4

      const currIsInSmaller = currNumber < nums[left]!;
      const currIsInLarger = !currIsInSmaller;
      const targetIsInSmaller = target < nums[left]!;
      const targetIsInLarger = !targetIsInSmaller;

      if (
        (currIsInSmaller && targetIsInSmaller && target > currNumber) ||
        (currIsInLarger && targetIsInLarger && target > currNumber) ||
        (currIsInLarger && targetIsInSmaller)
      ) {
        left = currIndex + 1;
      } else if (
        (currIsInSmaller && targetIsInSmaller && target < currNumber) ||
        (currIsInLarger && targetIsInLarger && target < currNumber) ||
        (currIsInSmaller && targetIsInLarger)
      ) {
        right = currIndex - 1;
      }
    }
    return -1;
  }
}

new Solution().search([5, 1, 3], 5);
