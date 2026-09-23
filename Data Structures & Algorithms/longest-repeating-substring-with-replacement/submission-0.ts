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
      // Update frequency map
      freq[s[right]!] = (freq[s[right]!] ?? 0) + 1;

      // Found new most frequent character
      if (freq[s[right]!]! > freq[mostFreq!]!) {
        mostFreq = s[right];
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

        // If leftmost value was one of the "most frequent", then potentially update "most frequent" value.
        if (s[left]! === mostFreq) {
          const prevMax = freq[mostFreq]!;
          for (const [key, value] of Object.entries(freq)) {
            if (value > prevMax) {
              mostFreq = key;
            }
          }
        }

        // Move left pointer
        left++;
      }
    }

    return result;
  }
}