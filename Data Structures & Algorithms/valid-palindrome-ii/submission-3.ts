// You are given a string s, return true if the s can be a palindrome after deleting at most one character from it.

// A palindrome is a string that reads the same forward and backward.

class Solution {
  /**
   * @param {string} s
   * @return {boolean}
   */
  validPalindrome(s: string): boolean {
    //
    const valid = (str: string, wrongCharLimit: number): boolean => {
      let left = 0;
      let right = str.length - 1;
      while (left < right) {
        if (str.charAt(left) === str.charAt(right)) {
          left++;
          right--;
        } else {
          if (wrongCharLimit > 0) {
            return (
              valid(str.substring(left + 1, right + 1), wrongCharLimit - 1) ||
              valid(str.substring(left, right), wrongCharLimit - 1)
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
