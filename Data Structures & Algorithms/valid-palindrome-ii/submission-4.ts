// You are given a string s, return true if the s can be a palindrome after deleting at most one character from it.

// A palindrome is a string that reads the same forward and backward.

class Solution {
  /**
   * @param {string} s
   * @return {boolean}
   */
  validPalindrome(s: string): boolean {
    // Run a normal 2 pointer palindrome check.
    const valid = (str: string, allowedSkips: number): boolean => {
      let left = 0;
      let right = str.length - 1;
      while (left < right) {
        if (str.charAt(left) === str.charAt(right)) {
          left++;
          right--;
        } else {
          // If we run into problems than
          // try with skipping a char from left or
          // try with skipping a schar from right
          // while decrease allowed skips.
          if (allowedSkips > 0) {
            return (
              valid(str.substring(left + 1, right + 1), allowedSkips - 1) ||
              valid(str.substring(left, right), allowedSkips - 1)
            );
          } else {
            return false;
          }
        }
      }
      return true;
    };

    return valid(s, 1);
  }
}

new Solution().validPalindrome("ab");
