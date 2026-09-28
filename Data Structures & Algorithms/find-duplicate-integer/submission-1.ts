// You are given an array of integers nums containing n + 1 integers.
// Each integer in nums is in the range [1, n] inclusive.

// There is exactly one repeated integer in nums, and every other integer appears at most once.

// Return the repeated integer.

// 1 <= n <= 10,000
// nums.length == n + 1
// 1 <= nums[i] <= n

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  findDuplicate(nums: number[]): number {
    // Floyd's: nums[i] - treat this as a pointer to another index

    // Find slow/fast intersection
    let slow = 0;
    let fast = 0;
    do {
      slow = nums[slow]!;
      fast = nums[nums[fast]!]!;
    } while (slow !== fast);

    // Start new slow pointer and find its intersection with old slow pointer
    let slow2 = 0;
    do {
      slow = nums[slow]!;
      slow2 = nums[slow2]!;
    } while (slow !== slow2);

    // Return intersection, why? Math! This is BS problem.
    return slow;
  }
}

new Solution().findDuplicate([1, 2, 3, 2, 2]);
