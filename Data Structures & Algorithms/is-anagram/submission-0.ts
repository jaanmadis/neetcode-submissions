class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {boolean}
   */
  isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
      return false;
    }

    const map: Record<string, number> = {};

    for (const c of s) {
      map[c] = (map[c] ?? 0) + 1;
    }

    for (const c of t) {
      if (!map[c]) {
        return false;
      }
      map[c]--;
    }

    return true;
  }
}
