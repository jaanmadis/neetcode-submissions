class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */
  hasDuplicate(nums: number[]): boolean {
    const seen = new Set<number>();
    for (let index = 0; index < nums.length; index++) {
      if (seen.has(nums[index]!)) {
        return true;
      } else {
        seen.add(nums[index]!);
      }
    }
    return false;
  }
}
