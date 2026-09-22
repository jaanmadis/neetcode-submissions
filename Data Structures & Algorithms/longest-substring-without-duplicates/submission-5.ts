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
      // If we find a character again.
      //
      // Then then move the start of the substing to position one after the character.
      // Eg. with x1234x5 substring starts at "1" when we find the second "x" and 1234x5 is the result.
      //
      // Take care to not move start backwards.
      // Having characters we've seen with index < start should not matter, we can't clean them, so ignore them.
      // Eg. with 1234xx12345 substring starts at second "x" and x12345 is the result.
      if (map[s[i]!] !== undefined) {
        start = Math.max(start, map[s[i]!]! + 1);
      }
      // Always update/add characters to map.
      map[s[i]!] = i;
      // Keep the running best.
      best = Math.max(best, i - start + 1);
    }
    return best;
  }
}