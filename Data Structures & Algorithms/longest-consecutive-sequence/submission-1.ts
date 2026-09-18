// Given an array of integers nums, return the length of the longest consecutive sequence of elements that can be formed.
// A consecutive sequence is a sequence of elements in which each element is exactly 1 greater than the previous element.
// The elements do not have to be consecutive in the original array.
// You must write an algorithm that runs in O(n) time.
//
// 0 <= nums.length <= 100,000
// -10^9 <= nums[i] <= 10^9

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  longestConsecutive(nums: number[]): number {
    if (nums.length === 0) {
      return 0;
    }

    let result = 1;

    // Store all numbers - O(n)
    const numSet = new Set<number>();
    nums.forEach((num) => {
      numSet.add(num);
    });

    // Process all numbers
    nums.forEach((num) => {
      // We have previous number in the set, so this is not the start of the sequence
      if (numSet.has(num - 1)) {
        return;
      }

      // Count the length of the sequence from this starting number.
      let currSeq = 1;
      let next = num + 1;
      while (numSet.has(next)) {
        currSeq++;
        next++;
      }

      // Check if this is the longest sequence.
      if (currSeq > result) {
        result = currSeq;
      }
    });

    return result;
  }
}

const solution = new Solution();
solution.longestConsecutive([2, 20, 4, 10, 3, 4, 5]);
solution.longestConsecutive([0, 3, 2, 5, 4, 6, 1, 1]);
