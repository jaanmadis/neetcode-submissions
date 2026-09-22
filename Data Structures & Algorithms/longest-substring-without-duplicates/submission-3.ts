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
    const map = new Map<string, number>();
    for (let i = 0; i < s.length; i++) {
      if (map.has(s[i]!)) {
        start = Math.max(start, map.get(s[i]!)! + 1);
      }
      map.set(s[i]!, i);
      best = Math.max(best, i - start + 1);
    }
    return best;
  }
}