// Given an integer array nums and an integer val,
// remove all occurrences of val in nums in-place.
// The order of the elements may be changed.
// Then return the number of elements in nums which are not equal to val.

// Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

// Change the array nums such that the first k elements of nums contain the elements which are not equal to val.
// The remaining elements of nums are not important as well as the size of nums.

// Return k.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} val
   * @return {number}
   */
  removeElement(nums: number[], val: number): number {
    let k = 0;
    // Two-pointer in-place algorithm.
    // i (read pointer): Iterates through every element.
    // k (write pointer): Tracks where to place the next valid element.
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== val) {
        nums[k] = nums[i]!;
        k++;
      }
    }
    return k;
  }
}

new Solution().removeElement([3, 2, 2, 3], 3);
