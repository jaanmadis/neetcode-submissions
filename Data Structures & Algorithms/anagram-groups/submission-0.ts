// Given an array of strings strs, group all anagrams together into sublists. You may return the output in any order.

// An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

class Solution {
  /**
   * @param {string[]} strs
   * @return {string[][]}
   */
  groupAnagrams(strs: string[]): string[][] {
    const anagrams: Record<string, string[]> = {};

    strs.forEach((str) => {
      const freq = new Array(26).fill(0); // only lowercase English letters

      for (const c of str) {
        const index = c.charCodeAt(0) - 97; // "a" is 97
        freq[index]++;
      }

      const key = freq.join(",");
      if (anagrams[key] === undefined) {
        anagrams[key] = [str];
      } else {
        anagrams[key].push(str);
      }
    });

    return Object.values(anagrams);
  }
}

const solution = new Solution();
const result = solution.groupAnagrams([
  "act",
  "pots",
  "tops",
  "cat",
  "stop",
  "hat",
]);
console.log(result);
