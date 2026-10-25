// You are given an array of integers nums, sort the array in ascending order and return it.

// You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number[]}
   */
  sortArray(nums: number[]): number[] {
    if (nums.length === 0) {
      return [];
    }

    if (nums.length === 1) {
      return [nums[0]!];
    }

    if (nums.length === 2) {
      return nums[0]! < nums[1]! ? [nums[0]!, nums[1]!] : [nums[1]!, nums[0]!];
    }

    const pivot = nums[nums.length - 1]!;

    let writeSmallsHere = 0;
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i]! <= pivot) {
        const tmp = nums[writeSmallsHere]!;
        nums[writeSmallsHere] = nums[i]!;
        nums[i] = tmp;
        writeSmallsHere++;
      }
    }

    const leftArr = this.sortArray(nums.slice(0, writeSmallsHere));
    const rightArr = this.sortArray(
      nums.slice(writeSmallsHere, nums.length - 1),
    );
    const result = [...leftArr, pivot, ...rightArr];

    return result;
  }
}

new Solution().sortArray([10, 9, 1, 1, 1, 2, 3, 1]);
