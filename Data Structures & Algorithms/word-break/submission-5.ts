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
    console.log(s);
    console.log(wordDict);

    // Can I set word break at index?
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for (let index = 0; index < dp.length; index++) {
      for (const word of wordDict) {
        // Get the point where we should have a break if we were to fit this word at index.
        const breakpoint = index - word.length;

        // Check if this point has a breakpoint.
        if (breakpoint >= 0 && dp[breakpoint] === true) {
          console.log(
            `word=${word} could fit at index=${index}, since we had a breakpoint at ${breakpoint}`,
          );

          // If we actually have a breakpoint, then check if the word matches the letters of input string too.
          const canBreak = s.startsWith(word, breakpoint);

          // If yes, then current index is a breakpoint (don't overwrite true).
          dp[index] = dp[index] || canBreak;

          console.log(
            `can we break at ${index} using word=${word}? -- ${canBreak}`,
          );
        }
      }
    }

    return dp[dp.length - 1];
  }

  wordBreakTopDown(s: string, wordDict: string[]): boolean {
    const search = (index: number, memo: Map<number, boolean>): boolean => {
      if (memo.has(index)) {
        return memo.get(index)!;
      }

      if (index === s.length) {
        return true;
      }

      for (let i = 0; i < wordDict.length; i++) {
        const word = wordDict[i]!;
        if (s.startsWith(word, index)) {
          if (search(index + word.length, memo)) {
            memo.set(index, true);
            return true;
          }
        }
      }

      memo.set(index, false);
      return false;
    };

    return search(0, new Map<number, boolean>());
  }
}
new Solution().wordBreak("applepenapple", ["apple", "pen", "ape"]);

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
