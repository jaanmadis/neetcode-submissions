// Given a string s, split s into substrings where every substring is a palindrome.
// Return all possible lists of palindromic substrings.
// You may return the solution in any order.

class Solution {
  /**
   * @param {string} s
   * @return {string[][]}
   */
  partition(s: string): string[][] {
    const isPalindrome = (candidate: string): boolean => {
      let left = 0;
      let right = candidate.length - 1;
      while (left < right) {
        if (candidate.charAt(left) !== candidate.charAt(right)) {
          return false;
        }
        left++;
        right--;
      }
      return true;
    };

    const result: string[][] = [];
    let subResult: string[] = [];

    const partition = (str: string) => {
      if (str.length === 0) {
        result.push([...subResult]);
        return;
      }
      let end = 1;
      while (end <= str.length) {
        const head = str.substring(0, end);
        const rest = str.substring(end);
        subResult.push(head);
        if (isPalindrome(head)) {
          partition(rest);
        }
        subResult.pop();
        end++;
      }
    };

    partition(s);

    return result;
  }
}

new Solution().partition("woowkekbur");
new Solution().partition("aab");
