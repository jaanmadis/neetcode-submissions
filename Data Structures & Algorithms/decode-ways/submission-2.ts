// A string consisting of uppercase english characters can be encoded to a number using the following mapping:

// 'A' -> "1"
// 'B' -> "2"
// ...
// 'Z' -> "26"
// To decode a message, digits must be grouped and then mapped back into letters using the reverse of the mapping above.
// There may be multiple ways to decode a message. For example, "1012" can be mapped into:

// "JAB" with the grouping (10 1 2)
// "JL" with the grouping (10 12)
// The grouping (1 01 2) is invalid because 01 cannot be mapped into a letter since it contains a leading zero.

// Given a string s containing only digits, return the number of ways to decode it. You can assume that the answer fits in a 32-bit integer.

function getChar(str: string): string {
  switch (str) {
    case "1":
      return "A";
    case "2":
      return "B";
    case "3":
      return "C";
    case "4":
      return "D";
    case "5":
      return "E";
    case "6":
      return "F";
    case "7":
      return "G";
    case "8":
      return "H";
    case "9":
      return "I";
    case "10":
      return "J";
    case "11":
      return "K";
    case "12":
      return "L";
    case "13":
      return "M";
    case "14":
      return "N";
    case "15":
      return "O";
    case "16":
      return "P";
    case "17":
      return "Q";
    case "18":
      return "R";
    case "19":
      return "S";
    case "20":
      return "T";
    case "21":
      return "U";
    case "22":
      return "V";
    case "23":
      return "W";
    case "24":
      return "X";
    case "25":
      return "Y";
    case "26":
      return "Z";
  }
  return "";
}

class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  numDecodings(s: string): number {
    const memo = new Map<number, number>();

    const decode = (index: number): number => {
      if (index === s.length) {
        return 1;
      }
      if (s[index] === "0") {
        return 0;
      }

      if (memo.has(index)) {
        return memo.get(index)!;
      }

      let result = decode(index + 1);

      if (
        index + 1 < s.length &&
        (s[index] === "1" || (s[index] === "2" && s[index + 1]! <= "6"))
      ) {
        result += decode(index + 2);
      }

      memo.set(index, result);

      return result;
    };

    return decode(0);
  }

  numDecodingsNotWhatWasAskedFor(s: string): number {
    const result: string[] = [];
    let subResult: string[] = [];

    const decode = (str: string) => {
      if (str.length === 0) {
        result.push(subResult.join(""));
        return;
      }
      const charOne = getChar(str[0]!);
      if (charOne === "") {
        return;
      }
      subResult.push(charOne);
      decode(str.substring(1));
      subResult.pop();
      if (str.length > 1) {
        const charTwo = getChar(`${str[0]!}${str[1]!}`);
        if (charTwo === "") {
          return;
        }
        subResult.push(charTwo);
        decode(str.substring(2));
        subResult.pop();
      }
    };

    decode(s);

    result.forEach((r) => console.log(r));

    return result.length;
  }
}

new Solution().numDecodings("12");
new Solution().numDecodings("123123123123123123123");
