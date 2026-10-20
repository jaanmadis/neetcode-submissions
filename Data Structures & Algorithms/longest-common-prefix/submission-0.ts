// You are given an array of strings strs. Return the longest common prefix of all the strings.

// If there is no longest common prefix, return an empty string "".

class Solution {
  /**
   * @param {string[]} strs
   * @return {string}
   */
  longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
      return "";
    }

    let result = strs[0]!;
    for (let i = 1; i < strs.length; i++) {
      let common = "";
      let j = 0;
      while (j < result.length && j < strs[i]!.length) {
        if (result.charAt(j) === strs[i]!.charAt(j)) {
          common += result.charAt(j);
          j++;
        } else {
          break;
        }
      }
      result = common;
      if (result.length === 0) {
        break;
      }
    }
    return result;
  }
}

new Solution().longestCommonPrefix(["flower", "", "flow"]);
new Solution().longestCommonPrefix(["dance", "dag", "danger", "damage"]);
new Solution().longestCommonPrefix(["neet", "feet"]);
