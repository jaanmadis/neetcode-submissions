// You are given two strings s1 and s2.
// Return true if s2 contains a permutation of s1, or false otherwise.
// That means if a permutation of s1 exists as a substring of s2, then return true.
// Both strings only contain lowercase letters.

class Solution {
  /**
   * @param {string} s1
   * @param {string} s2
   * @return {boolean}
   */
  checkFreq(
    s1freq: Record<string, number>,
    s2freq: Record<string, number>,
  ): boolean {
    let result = true;
    for (const [key, value] of Object.entries(s1freq)) {
      if (s2freq[key] !== value) {
        result = false;
        break;
      }
    }
    return result;
  }

  checkInclusion(s1: string, s2: string): boolean {
    let s1freq: Record<string, number> = {};
    let s2freq: Record<string, number> = {};

    for (let i = 0; i < s1.length; i++) {
      s1freq[s1[i]!] = (s1freq[s1[i]!]! ?? 0) + 1;
      s2freq[s2[i]!] = (s2freq[s2[i]!]! ?? 0) + 1;
    }

    let left = 0;
    let right = s1.length - 1;
    while (right < s2.length) {
      if (this.checkFreq(s1freq, s2freq)) {
        return true;
      }
      s2freq[s2[left]!] = (s2freq[s2[left]!]! ?? 0) - 1;
      left++;
      right++;
      s2freq[s2[right]!] = (s2freq[s2[right]!]! ?? 0) + 1;
    }

    return false;
  }
}

new Solution().checkInclusion("abc", "1234567cab");
