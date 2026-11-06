// Given a string s, return the longest substring of s that is a palindrome.

// A palindrome is a string that reads the same forward and backward.

// If there are multiple palindromic substrings that have the same length, return any one of them.

class Solution {
  /**
   * @param {string} s
   * @return {string}
   */
  longestPalindrome(s: string): string {
    const check = (
      left: number,
      right: number,
      result: string = "",
    ): string => {
      while (left >= 0 && right < s.length) {
        if (s.charAt(left) === s.charAt(right)) {
          result = `${s.charAt(left)}${result}${s.charAt(right)}`;
        } else {
          break;
        }
        left--;
        right++;
      }
      return result;
    };

    let best = "";
    for (let i = 0; i < s.length; i++) {
      const odd = check(i - 1, i + 1, s.charAt(i));
      const even = check(i - 1, i);
      if (odd.length > best.length) {
        best = odd;
      }
      if (even.length > best.length) {
        best = even;
      }
    }
    return best;
  }
}

new Solution().longestPalindrome("abbabd");
