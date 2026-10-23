// You are given an array of characters which represents a string s. Write a function which reverses a string.

// You must do this by modifying the input array in-place with O(1) extra memory.

class Solution {
  /**
   * @param {character[]} s
   * @return {void} Do not return anything, modify s in-place instead.
   */
  reverseString(s: string[]): void {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
      const temp = s[left]!;
      s[left] = s[right]!;
      s[right] = temp;
      left++;
      right--;
    }
  }
}
