// You are given two integer arrays nums1 and nums2, both sorted in non-decreasing order, along with two integers m and n, where:

// m is the number of valid elements in nums1,

// n is the number of elements in nums2.

// The array nums1 has a total length of (m+n), with the first m elements containing the values to be merged,
// and the last n elements set to 0 as placeholders.

// Your task is to merge the two arrays such that the final merged array is also sorted in
// non-decreasing order and stored entirely within nums1.
// You must modify nums1 in-place and do not return anything from the function.

class Solution {
  /**
   * @param {number[]} nums1
   * @param {number} m
   * @param {number[]} nums2
   * @param {number} n
   * @return {void} Do not return anything, modify nums1 in-place instead.
   */
  merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let ptr1 = m - 1;
    let ptr2 = n - 1;
    let ptrw = nums1.length - 1;
    while (ptr1 >= 0 && ptr2 >= 0) {
      if (nums1[ptr1]! > nums2[ptr2]!) {
        nums1[ptrw] = nums1[ptr1]!;
        ptr1--;
      } else {
        nums1[ptrw] = nums2[ptr2]!;
        ptr2--;
      }
      ptrw--;
    }
    while (ptr2 >= 0) {
      nums1[ptrw] = nums2[ptr2]!;
      ptr2--;
      ptrw--;
    }
  }
}

new Solution().merge([10, 20, 20, 40, 0, 0], 4, [1, 2], 2);
