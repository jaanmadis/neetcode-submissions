class Solution {
  /**
   * @param {string} s
   * @param {number} k
   * @return {number}
   */
  characterReplacement(s: string, k: number): number {
    let result = 0;
    let freq: Record<string, number> = {};
    let left = 0;

    // s.length >= 1, so we can init the mostFreq with s[0]
    let mostFreq = s[0];

    for (let right = 0; right < s.length; right++) {
      const currChar = s[right]!;
      
      // Update frequency map
      freq[currChar] = (freq[currChar] ?? 0) + 1;

      // Found new most frequent character
      if (freq[currChar] > freq[mostFreq!]!) {
        mostFreq = currChar;
      }

      // Window is valid, if from left to right we have less than k chars that are not "most frequent".
      // In other words we could replace all non-"most frequent" in the window and make the window all "most frequent".
      let isWindowValid = right - left + 1 - freq[mostFreq!]! <= k;

      if (isWindowValid) {
        // Result is the width if the valid window
        result = right - left + 1;
      } else {
        // If window is not valid

        // Then decrease freq of the leftmost value.
        freq[s[left]!]!--;

        // Move left pointer
        left++;

        // Don't bother to "fix" mostFreq.
        // Even if the leftmost char was one of the mostFreq chars,
        // then maybe mostFreq is now tied with the next most freq char.
        // This is still fine like this to proceed.
        // If the next char on the right is the next most freq char,
        // then mostFreq will be updated in the next iteration of or for loop.
      }
    }

    return result;
  }
}
