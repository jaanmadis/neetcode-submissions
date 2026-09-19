// Given an integer array nums,
// return all the triplets [nums[i], nums[j], nums[k]] where nums[i] + nums[j] + nums[k] == 0,
// and the indices i, j and k are all distinct.
// The output should not contain any duplicate triplets. You may return the output and the triplets in any order.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  threeSum(nums: number[]): number[][] {
    let result: number[][] = [];
    // Sort the array first
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
      // Skip duplicate targets
      if (i > 0 && nums[i] === nums[i - 1]) {
        continue;
      }

      // Pick target starting from smallest index.
      // Triplet should be target and two other numbers a and b.
      // Since a + b + target = 0, then a + b = -triplets and this becomes twoSum problem.
      let target = -nums[i]!;

      // Left should always be one after target, since input is sorted and we already checked a target's triplets.
      let left = i + 1;

      // Right is always the last element of input.
      let right = nums.length - 1;

      while (left < right) {
        let sum = nums[left]! + nums[right]!;
        if (sum === target) {
          result.push([-target, nums[left]!, nums[right]!]);
          // There may be other nums[left] and nums[right] that yield target, so keep looking.
          // But do skip duplicates.
          // Eg. target = 2
          // [0, 0, 2, 2] we only need one [-2, 0, 2] triplet
          do {
            left++;
          } while (nums[left] === nums[left - 1]);
          do {
            right--;
          } while (nums[right] === nums[right + 1]);
        } else if (sum < target) {
          left++;
        } else if (sum > target) {
          right--;
        }
      }
    }
    return result;
  }
}

const solution = new Solution();
solution.threeSum([0, 0, 0, 0]);
solution.threeSum([-1, 0, 1, 2, -1, -4]);
solution.threeSum([-2, 0, 0, 2, 2]);
