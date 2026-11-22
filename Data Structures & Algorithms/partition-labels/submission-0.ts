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

    const map = new Map<string, number>();
    for (let i = 0; i < S.length; i++) {
      map.set(S[i]!, i);
    }

    let charWasLastSeenAt = 0;
    let runEndsAt = 0;
    let len = 0;
    for (let i = 0; i < S.length; i++) {
      charWasLastSeenAt = map.get(S[i]!)!;
      if (charWasLastSeenAt > runEndsAt) {
        runEndsAt = charWasLastSeenAt;
      }
      len++;
      if (charWasLastSeenAt <= runEndsAt && i === runEndsAt) {
        result.push(len);
        len = 0;
      }
    }

    return result;
  }
}

new Solution().partitionLabels("xyxxyzbzbbisl");
