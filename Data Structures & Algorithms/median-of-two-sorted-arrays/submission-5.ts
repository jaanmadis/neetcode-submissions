// You are given two integer arrays nums1 and nums2 of size m and n respectively,
// where each is sorted in ascending order.
// Return the median value among all elements of the two arrays.

// Your solution should run in O(log(m+n)) time.

class Solution {
  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number}
   */
  findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (nums1.length + nums2.length === 0) {
      return NaN;
    }

    // Ensure nums1 is always the smaller one.
    if (nums1.length > nums2.length) {
      return this.findMedianSortedArrays(nums2, nums1);
    }

    const half = Math.floor((nums1.length + nums2.length + 1) / 2);
    let left = 0;
    let right = nums1.length;
    while (left <= right) {
      const smallPartitionSize = Math.floor((left + right) / 2);
      const largePartitionSize = half - smallPartitionSize;

      const smallLeft =
        smallPartitionSize === 0 ? -Infinity : nums1[smallPartitionSize - 1]!;

      const smallRight =
        smallPartitionSize === nums1.length
          ? Infinity
          : nums1[smallPartitionSize]!;

      const largeLeft =
        largePartitionSize === 0 ? -Infinity : nums2[largePartitionSize - 1]!;

      const largeRight =
        largePartitionSize === nums2.length
          ? Infinity
          : nums2[largePartitionSize]!;

      if (smallLeft <= largeRight && largeLeft <= smallRight) {
        if ((nums1.length + nums2.length) % 2 === 1) {
          return Math.max(smallLeft, largeLeft);
        }

        return (
          (Math.max(smallLeft, largeLeft) + Math.min(smallRight, largeRight)) /
          2
        );
      }

      if (smallLeft > largeRight) {
        right = smallPartitionSize - 1;
      } else {
        left = smallPartitionSize + 1;
      }
    }

    return NaN;
  }
}

new Solution().findMedianSortedArrays([1], [2, 3, 4, 5, 6, 7, 8, 9, 10]);
new Solution().findMedianSortedArrays([1, 2, 3, 4, 5, 6], [1, 1, 2, 2, 2]);
new Solution().findMedianSortedArrays([1, 2, 3, 4, 5, 6], [8, 8, 9, 9, 9]);
new Solution().findMedianSortedArrays([1, 2, 3, 4, 5, 6], [2, 4, 8, 9, 10]);
