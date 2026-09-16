// Given an integer array nums and an integer k, return the k most frequent elements within the array.
// The test cases are generated such that the answer is always unique.
// You may return the output in any order.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number[]}
   */
  topKFrequent(nums: number[], k: number): number[] {
    const freq: Record<number, number> = {};

    // Get frequencies
    nums.forEach((num) => {
      freq[num] = (freq[num] ?? 0) + 1;
    });

    // buckets[frequency] -> numbers with that frequency
    const buckets: number[][] = [];

    for (const [key, value] of Object.entries(freq)) {
      if (buckets[value]) {
        buckets[value].push(Number(key));
      } else {
        buckets[value] = [Number(key)];
      }
    }

    // Walk from highest frequency to lowest
    const result: number[] = [];

    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
      result.push(...(buckets[i] ?? []));
    }

    return result.slice(0, k);
  }
}

const solution = new Solution();
const result = solution.topKFrequent(
  [1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5],
  3,
);
console.log(result);
