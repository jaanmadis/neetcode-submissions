// Given a string s, return true if it is a palindrome, otherwise return false.

// A palindrome is a string that reads the same forward and backward.
// It is also case-insensitive and ignores all non-alphanumeric characters.

// Note: Alphanumeric characters consist of letters (A-Z, a-z) and numbers (0-9).

class Solution {
  /**
   * @param {string} s
   * @return {boolean}
   */
  isPalindrome(s: string): boolean {
    s = s.replace(/[^A-Za-z0-9]/g, "").toLocaleLowerCase();
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }
}

const solution = new Solution();
solution.isPalindrome("Was it a car or a cat I saw?");
