// Design an algorithm to encode a list of strings to a string.
// The encoded string is then sent over the network and is decoded back to the original list of strings.

class Solution {
  /**
   * @param {string[]} strs
   * @returns {string}
   */
  encode(strs: string[]): string {
    let result = "";
    strs.forEach((str) => (result = result + str.length + "#" + str));
    return result;
  }

  /**
   * @param {string} str
   * @returns {string[]}
   */
  decode(str: string): string[] {
    const strs: string[] = [];
    let i = 0;
    let len = 0;
    let end = 0;
    while (i < str.length) {
      while (str[i] !== "#") {
        i++;
      }
      len = Number(str.slice(end, i));
      strs.push(str.slice(i + 1, i + 1 + len));
      end = i + 1 + len;
      i = i + 1 + len;
    }
    return strs;
  }
}