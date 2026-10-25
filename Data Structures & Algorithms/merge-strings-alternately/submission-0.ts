// You are given two strings, word1 and word2. Construct a new string by merging them in alternating order, starting with word1 — take one character from word1, then one from word2, and repeat this process.

// If one string is longer than the other, append the remaining characters from the longer string to the end of the merged result.

// Return the final merged string.

class Solution {
  /**
   * @param {string} word1
   * @param {string} word2
   * @return {string}
   */
  mergeAlternately(word1: string, word2: string): string {
    let ptr1 = 0;
    let ptr2 = 0;
    let result = "";
    while (ptr1 < word1.length && ptr2 < word2.length) {
      result += word1[ptr1]! + word2[ptr2]!;
      ptr1++;
      ptr2++;
    }
    if (ptr1 === word1.length) {
      result += word2.substring(ptr2);
    }
    if (ptr2 === word2.length) {
      result += word1.substring(ptr1);
    }
    return result;
  }
}

new Solution().mergeAlternately("12345678", "a");
