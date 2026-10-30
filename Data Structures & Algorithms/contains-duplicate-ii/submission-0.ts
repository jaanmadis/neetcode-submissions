// You are given an integer array nums and an integer k,
// return true if there are two distinct indices i and j in the array such that
// nums[i] == nums[j] and abs(i - j) <= k,
// otherwise return false.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {boolean}
   */
  containsNearbyDuplicate(nums: number[], k: number): boolean {
    if (nums.length === 0) {
      return false;
    }
    const numSet = new Set<number>();
    let left = 0;
    let right = 1;
    numSet.add(nums[0]!);
    while (right < nums.length) {
      if (right > k) {
        numSet.delete(nums[left]!);
        left++;
      }

      const newNum = nums[right]!;
      if (numSet.has(newNum)) {
        return true;
      }
      numSet.add(newNum);
      right++;
    }
    return false;
  }
}

new Solution().containsNearbyDuplicate(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 91],
  3,
);
new Solution().containsNearbyDuplicate([1, 2, 3, 1], 3);
