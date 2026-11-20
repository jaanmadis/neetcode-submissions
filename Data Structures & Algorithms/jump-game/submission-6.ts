// You are given an integer array nums where each element nums[i] indicates your maximum jump length at that position.

// Return true if you can reach the last index starting from index 0, or false otherwise.

class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */
  canJump(nums: number[]): boolean {
    let goal = nums.length - 1;
    for (let i = nums.length - 1; i >= 0; i--) {
      if (i + nums[i]! >= goal) {
        goal = i;
      }
    }
    return goal === 0;
  }

  canJumpMemo(nums: number[]): boolean {
    const memo = new Map<number, boolean>();

    const jump = (index: number): boolean => {
      let jumpLength = nums[index]!;

      if (index + jumpLength >= nums.length - 1) {
        return true;
      }

      if (jumpLength === 0) {
        return false;
      }

      if (memo.has(index)) {
        return memo.get(index)!;
      }

      for (let i = 1; i <= jumpLength; i++) {
        if (jump(index + i)) {
          return true;
        }
      }

      memo.set(index, false);
      return false;
    };

    return jump(0);
  }
}

new Solution().canJump([1, 2, 0, 1, 0]);
