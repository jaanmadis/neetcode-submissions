// Given two strings s and t, return the shortest substring of s such that every character in t,
// including duplicates, is present in the substring.
//
// If such a substring does not exist, return an empty string "".
//
// You may assume that the correct output is always unique.
//
// s and t consist of uppercase and lowercase English letters.

class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {string}
   */
  minWindow(s: string, t: string): string {
    const freqS: Record<string, number> = {};
    const freqT: Record<string, number> = {};

    for (let i = 0; i < t.length; i++) {
      freqT[t[i]!] = (freqT[t[i]!] ?? 0) + 1;
    }

    let left = 0;
    let right = 0;
    let matches = 0;
    const required = Object.keys(freqT).length;

    let result = "";

    while (right < s.length) {
      freqS[s[right]!] = (freqS[s[right]!] ?? 0) + 1;

      if (freqS[s[right]!] === freqT[s[right]!]) {
        matches++;
      }

      while (matches === required) {
        if (result === "" || right - left < result.length) {
          result = s.slice(left, right + 1);
        }
        if (freqS[s[left]!] === freqT[s[left]!]) {
          matches--;
        }
        freqS[s[left]!] = (freqS[s[left]!] ?? 0) - 1;
        left++;
      }

      right++;
    }

    return result;
  }
}