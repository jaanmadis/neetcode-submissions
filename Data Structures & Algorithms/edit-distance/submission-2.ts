// You are given two strings word1 and word2, each consisting of lowercase English letters.
// You are allowed to perform three operations on word1 an unlimited number of times:
// Insert a character at any position
// Delete a character at any position
// Replace a character at any position
// Return the minimum number of operations to make word1 equal word2.

class Solution {
  /**
   * @param {string} word1
   * @param {string} word2
   * @return {number}
   */
  minDistance(word1: string, word2: string): number {
    const memo = new Map<string, number>();

    const find = (index1: number, index2: number): number => {
      while (
        index1 < word1.length &&
        index2 < word2.length &&
        word1[index1] === word2[index2]
      ) {
        index1++;
        index2++;
      }

      if (index1 === word1.length && index2 === word2.length) {
        return 0;
      }

      const key = `${index1}-${index2}`;

      if (memo.has(key)) {
        return memo.get(key)!;
      }

      let del = Infinity;
      let add = Infinity;
      let rep = Infinity;

      if (index1 < word1.length) {
        del = 1 + find(index1 + 1, index2);
      }
      if (index2 < word2.length) {
        add = 1 + find(index1, index2 + 1);
      }
      if (index1 < word1.length && index2 < word2.length) {
        rep = 1 + find(index1 + 1, index2 + 1);
      }

      const value = Math.min(del, add, rep);

      memo.set(key, value);

      return value;
    };

    const out = find(0, 0);
    console.log(out);
    return out;
  }
}

// new Solution().minDistance("neatcdee", "neetcode");
new Solution().minDistance("monkeys", "money");
