// Given a string s and a dictionary of strings wordDict,
// return true if s can be segmented into a space-separated sequence of dictionary words.

// You are allowed to reuse words in the dictionary an unlimited number of times.
// You may assume all dictionary words are unique.

class Solution {
  /**
   * @param {string} s
   * @param {string[]} wordDict
   * @return {boolean}
   */
  wordBreak(s: string, wordDict: string[]): boolean {
    const search = (index: number, memo: Map<number, boolean>): boolean => {
      if (memo.has(index)) {
        return memo.get(index)!;
      }
      if (index === s.length) {
        console.log(`search complete, found`);
        return true;
      }
      for (let i = 0; i < wordDict.length; i++) {
        const word = wordDict[i]!;
        console.log(`searching word=${word} at index=${index}`);
        if (s.startsWith(word, index)) {
          if (search(index + word.length, memo)) {
            memo.set(index, true);
            return true;
          }
        }
      }
      console.log(`search complete, didn't find`);
      memo.set(index, false);
      return false;
    };

    return search(0, new Map<number, boolean>());
  }
}

new Solution().wordBreak(
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  [
    "aa",
    "aaa",
    "aaaa",
    "aaaaa",
    "aaaaaa",
    "aaaaaaa",
    "aaaaaaaa",
    "aaaaaaaaa",
    "aaaaaaaaaa",
    "ba",
  ],
);
