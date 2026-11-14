// You are given three strings s1, s2, and s3. Return true if s3 is formed by interleaving s1 and s2 together or false otherwise.

// Interleaving two strings s and t is done by dividing s and t into n and m substrings respectively, where the following conditions are met

// |n - m| <= 1, i.e. the difference between the number of substrings of s and t is at most 1.
// s = s1 + s2 + ... + sn
// t = t1 + t2 + ... + tm
// Interleaving s and t is s1 + t1 + s2 + t2 + ... or t1 + s1 + t2 + s2 + ...
// You may assume that s1, s2 and s3 consist of lowercase English letters.

class Solution {
  /**
   * @param {string} s1
   * @param {string} s2
   * @param {string} s3
   * @return {boolean}
   */
  isInterleave(s1: string, s2: string, s3: string): boolean {
    if (s1.length + s2.length !== s3.length) {
      return false;
    }

    const memo = new Map<string, boolean>();

    const find = (i1: number, i2: number): boolean => {
      if (i1 >= s1.length && i2 >= s2.length) {
        return true;
      }

      const key = `${i1}-${i2}`;

      if (memo.has(key)) {
        return memo.get(key)!;
      }

      let found1 = false;
      let found2 = false;

      if (i1 < s1.length && s1.charAt(i1) === s3.charAt(i1 + i2)) {
        found1 = find(i1 + 1, i2);
      }

      if (i2 < s2.length && s2.charAt(i2) === s3.charAt(i1 + i2)) {
        found2 = find(i1, i2 + 1);
      }

      const value = found1 || found2;

      memo.set(key, value);

      return value;
    };

    return find(0, 0);
  }
}

new Solution().isInterleave("aaaa", "bbbb", "aabbbbaa");
