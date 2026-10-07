// Given an integer n, count the number of 1's in the binary representation of every number in the range [0, n].

// Return an array output where output[i] is the number of 1's in the binary representation of i.

class Solution {
  /**
   * @param {number} n
   * @return {number[]}
   */

  // The look-back distance doubles each time
  // Number of times we should loock back also doubles

  //  0 -    0
  //  1 -    1   look 1 hop back (look at 0), add 1

  //  2 -   10   look 2 hops back (look at 0), add 1
  //  3 -   11   look 2 hops back (look at 1), add 1

  //  4 -  100   look 4 hops back (look at 0), add 1
  //  5 -  101   look 4 hops back (look at 1), add 1
  //  6 -  110   look 4 hops back (look at 10), add 1
  //  7 -  111   look 4 hops back (look at 11), add 1

  //  8 - 1000   look 8 hops back (look at 0), add 1
  //  9 - 1001   look 8 hops back (look at 1), add 1
  // 10 - 1010   look 8 hops back (look at 10), add 1
  // 11 - 1011   look 8 hops back (look at 11), add 1
  // 12 - 1100   look 8 hops back (look at 100), add 1
  // 13 - 1101   look 8 hops back (look at 101), add 1
  // 14 - 1110   look 8 hops back (look at 110), add 1
  // 15 - 1111   look 8 hops back (look at 111), add 1

  countBits(n: number): number[] {
    if (n === 0) {
      return [0];
    }
    let result = new Array(n).fill(0);
    let lookBackDistance = 1;
    let lookBackTimes = 1;
    let timesLookedBack = 0;
    for (let i = 1; i <= n; i++) {
      result[i] = result[i - lookBackDistance] + 1;
      timesLookedBack++;
      if (timesLookedBack === lookBackTimes) {
        lookBackDistance = lookBackDistance * 2;
        lookBackTimes = lookBackTimes * 2;
        timesLookedBack = 0;
      }
    }
    return result;
  }

  countBitsSlow(n: number): number[] {
    const count = (input: number): number => {
      let result = 0;
      let number = input;
      while (number !== 0) {
        number = number & (number - 1);
        result++;
      }
      return result;
    };

    let result = [];
    for (let i = 0; i <= n; i++) {
      result.push(count(i));
    }
    return result;
  }
}

new Solution().countBits(16);
