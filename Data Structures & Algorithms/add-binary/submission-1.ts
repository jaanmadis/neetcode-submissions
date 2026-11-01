// You are given two binary strings a and b, return their sum as a binary string.

class Solution {
  /**
   * @param {string} a
   * @param {string} b
   * @return {string}
   */
  addBinary(a: string, b: string): string {
    const binToNumber = (bits: string): bigint => {
      let result = 0n;
      let pows = 1n;
      for (let i = bits.length - 1; i >= 0; i--) {
        if (bits.charAt(i) === "1") {
          result = result + pows;
        }
        pows = pows * 2n;
      }
      return result;
    };

    const numberToBin = (n: bigint): string => {
      if (n === 0n) {
        return "0";
      }

      let result = "";
      let reminder = n;

      while (reminder > 0) {
        const bit = reminder % 2n;
        reminder = reminder / 2n; // BigInt division already does floor
        result = `${bit}${result}`;
      }

      return result;
    };

    const an = binToNumber(a);
    const bn = binToNumber(b);
    return numberToBin(an + bn);
  }
}

new Solution().addBinary(
  "1111110101011100101111110001001010001100011001010100110001",
  "1111110101011100101111110001001010001100011001010100110001",
);

new Solution().addBinary(
  "1111110101011010101111100001001111100000011001010101000001",
  "10000000001111111010101011111111111111110000",
);
