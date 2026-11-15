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
    // dp[i][j] = how may operations needed
    //     m  o  n  e  y  ""
    //  m                 7
    //  o                 6
    //  n                 5
    //  k                 4
    //  e                 3
    //  y                 2
    //  s                 1
    //  "" 5  4  3  2  1  0

    const dp = Array.from({ length: word1.length + 1 }, () =>
      Array(word2.length + 1).fill(0),
    );
    for (let i = 0; i < word1.length; i++) {
      dp[i]![word2.length]! = word1.length - i;
    }
    for (let j = 0; j < word2.length; j++) {
      dp[word1.length]![j]! = word2.length - j;
    }

    dp.forEach((d) => console.log(d));
    console.log("===============");

    for (let i = word1.length - 1; i >= 0; i--) {
      for (let j = word2.length - 1; j >= 0; j--) {
        if (word1[i] === word2[j]) {
          dp[i]![j] = dp[i + 1]![j + 1]!;
        } else {
          const del = 1 + dp[i + 1]![j];
          const add = 1 + dp[i]![j + 1];
          const rep = 1 + dp[i + 1]![j + 1];
          dp[i]![j] = Math.min(del, add, rep);
        }
      }
    }

    dp.forEach((d) => console.log(d));
    return dp[0]![0]!;
  }

  minDistanceMemo(word1: string, word2: string): number {
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
