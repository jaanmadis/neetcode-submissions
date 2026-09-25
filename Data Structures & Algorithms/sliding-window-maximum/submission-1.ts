// You are given an array of integers nums and an integer k.
// There is a sliding window of size k that starts at the left edge of the array.
// The window slides one position to the right until it reaches the right edge of the array.
// Return a list that contains the maximum element in the window at each step.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number[]}
   */
  maxSlidingWindow(nums: number[], k: number): number[] {
    const result: number[] = [];
    const deq: number[] = [];

    let left = 0;
    let right = 0;

    while (right < nums.length) {
      while (right - left < k) {
        while (
          deq[deq.length - 1] !== undefined &&
          deq[deq.length - 1]! < nums[right]!
        ) {
          deq.pop();
        }
        deq.push(nums[right]!);
        right++;
      }
      result.push(deq[0]!);
      if (nums[left] === deq[0]) {
        deq.shift();
      }
      left++;
    }

    return result;
  }
}

new Solution().maxSlidingWindow([1, 3, 1, 2, 0, 5], 3);
