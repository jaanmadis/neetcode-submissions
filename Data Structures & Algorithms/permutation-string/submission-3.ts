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
  checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) {
      return false;
    }

    const CHARS = 26;
    const OFFSET = "a".charCodeAt(0);

    let s1freq: number[] = new Array(CHARS).fill(0);
    let s2freq: number[] = new Array(CHARS).fill(0);

    for (let i = 0; i < s1.length; i++) {
      s1freq[s1[i]!.charCodeAt(0) - OFFSET]!++;
      s2freq[s2[i]!.charCodeAt(0) - OFFSET]!++;
    }

    let matches = 0;
    for (let i = 0; i < CHARS; i++) {
      if (s1freq[i] === s2freq[i]) {
        matches++;
      }
    }

    let left = 0;
    let right = s1.length - 1;
    while (matches !== CHARS && right < s2.length - 1) {
      left++;
      right++;

      const prevLeftChar = s2[left - 1]!.charCodeAt(0) - OFFSET;
      const prevLeftMatch = s1freq[prevLeftChar] === s2freq[prevLeftChar];
      s2freq[prevLeftChar]!--;

      if (s1freq[prevLeftChar] === s2freq[prevLeftChar]) {
        if (!prevLeftMatch) {
          matches++;
        }
      } else {
        if (prevLeftMatch) {
          matches--;
        }
      }

      const nextRightChar = s2[right]!.charCodeAt(0) - OFFSET;
      const nextRightMatch = s1freq[nextRightChar] === s2freq[nextRightChar];
      s2freq[nextRightChar]!++;

      if (s1freq[nextRightChar] === s2freq[nextRightChar]) {
        if (!nextRightMatch) {
          matches++;
        }
      } else {
        if (nextRightMatch) {
          matches--;
        }
      }
    }

    return matches === CHARS;
  }
}

new Solution().checkInclusion("abc", "bbbca");
