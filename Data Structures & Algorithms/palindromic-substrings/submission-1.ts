// Given a string s, return the number of substrings within s that are palindromes.

// A palindrome is a string that reads the same forward and backward.

class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  countSubstrings(s: string): number {
    let result = 0;

    const expand = (left: number, right: number) => {
      while (left >= 0 && right < s.length) {
        if (s.charAt(left) === s.charAt(right)) {
          result++;
          left--;
          right++;
        } else {
          break;
        }
      }
    };

    for (let i = 0; i < s.length; i++) {
      expand(i, i);
      expand(i, i + 1);
    }

    return result;
  }
}

new Solution().countSubstrings("abbabbabba");
