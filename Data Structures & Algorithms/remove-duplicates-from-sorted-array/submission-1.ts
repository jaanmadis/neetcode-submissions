// You are given an integer array nums sorted in non-decreasing order. Your task is to remove duplicates from nums in-place so that each element appears only once.

// After removing the duplicates, return the number of unique elements, denoted as k, such that the first k elements of nums contain the unique elements.

// Note:

// The order of the unique elements should remain the same as in the original array.
// It is not necessary to consider elements beyond the first k positions of the array.
// To be accepted, the first k elements of nums must contain all the unique elements.
// Return k as the final result.

class Solution {
  removeDuplicates(nums: number[]): number {
    if (nums.length <= 1) {
      return nums.length;
    }

    let k = 1;

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] !== nums[k - 1]) {
        nums[k] = nums[i]!;
        k++;
      }
    }

    return k;
  }
}

new Solution().removeDuplicates([1, 2, 3, 4, 5]);
new Solution().removeDuplicates([1, 1, 1, 1, 4, 4, 5, 6]);

new Solution().removeDuplicates([1, 1, 2, 3, 4]);
