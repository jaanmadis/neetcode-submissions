// You are given an integer array nums, handle multiple queries of the following type:

// Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
// Implement the NumArray class:

// NumArray(int[] nums) Initializes the object with the integer array nums.

// int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).

class NumArray {
  /**
   * @param {number[]} nums
   */
  private nums: number[] = [];

  constructor(nums: number[]) {
    this.nums = nums;
  }

  /**
   * @param {number} left
   * @param {number} right
   * @return {number}
   */
  sumRange(left: number, right: number): number {
    if (
      left >= this.nums.length ||
      right >= this.nums.length ||
      left < 0 ||
      right < 0
    ) {
      return 0;
    }

    let sum = 0;
    while (left <= right) {
      sum += this.nums[left]!;
      left++;
    }
    return sum;
  }
}
