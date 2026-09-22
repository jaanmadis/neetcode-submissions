// Given a string s, find the length of the longest substring without duplicate characters.
// A substring is a contiguous sequence of characters within a string.

class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  lengthOfLongestSubstring(s: string): number {
    let best = 0;
    let start = 0;
    let map: Record<string, number> = {};
    for (let i = 0; i < s.length; i++) {
      if (map[s[i]!] !== undefined) {
        start = Math.max(start, map[s[i]!]! + 1);
      }
      map[s[i]!] = i;
      best = Math.max(best, i - start + 1);
    }
    return best;
  }
}