// You are given a string s consisting of lowercase english letters.

// We want to split the string into as many substrings as possible, while ensuring that each letter appears in at most one substring.

// Return a list of integers representing the size of these substrings in the order they appear in the string.

class Solution {
  /**
   * @param {string} S
   * @return {number[]}
   */
  partitionLabels(S: string): number[] {
    const result: number[] = [];

    // First pass - record where was the last position we saw each char at.
    const map = new Map<string, number>();
    for (let i = 0; i < S.length; i++) {
      map.set(S[i]!, i);
    }

    // Second pass - set the run end to where char was last seen and keep scanning.
    // If we see some other char that has even further last seen, then increase run end to that position.
    // If we reach run end and we saw no characters that will be last seen furthe on, then we can cut the substring here.
    let runEndsAt = 0;
    let runLen = 0;
    for (let i = 0; i < S.length; i++) {
      const charWasLastSeenAt = map.get(S[i]!)!;
      if (charWasLastSeenAt > runEndsAt) {
        runEndsAt = charWasLastSeenAt;
      }

      runLen++;
      if (i === runEndsAt) {
        result.push(runLen);
        runLen = 0;
      }
    }

    return result;
  }
}

new Solution().partitionLabels("xyxxyzbzbbisl");
