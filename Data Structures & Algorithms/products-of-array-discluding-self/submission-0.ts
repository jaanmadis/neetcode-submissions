// Given an integer array nums, return an array output where output[i] is the product of all the elements of nums except nums[i].
// Each product is guaranteed to fit in a 32-bit integer.
// Follow-up: Could you solve it in O(n) time without using the division operation?

class Solution {
  /**
   * @param {number[]} nums
   * @return {number[]}
   */
  productExceptSelf(nums: number[]): number[] {
    const result: number[] = Array(nums.length).fill(1);

    let left = 1;

    for (let i = 0; i < nums.length; i++) {
      result[i] = left;
      left *= nums[i]!;
    }

    let right = 1;

    for (let i = nums.length - 1; i >= 0; i--) {
      result[i]! *= right;
      right *= nums[i]!;
    }

    return result;
  }
}