// You are given an array of integers arr and two integers k and threshold,
// return the number of sub-arrays of size k and average greater than or equal to threshold.

class Solution {
  /**
   * @param {number[]} arr
   * @param {number} k
   * @param {number} threshold
   * @return {number}
   */
  numOfSubarrays(arr: number[], k: number, threshold: number): number {
    let result = 0;

    if (arr.length < k) {
      return result;
    }

    const thresholdK = threshold * k;

    let left = 0;
    let right = 0;
    let sum = 0;

    while (right < k) {
      sum += arr[right]!;
      right++;
    }

    do {
      if (sum >= thresholdK) {
        result++;
      }
      sum = sum - arr[left]!;
      left++;
      sum = sum + arr[right]!;
      right++;
    } while (right <= arr.length);

    return result;
  }
}

new Solution().numOfSubarrays([1, 1, 1, 1, 1], 1, 0);
