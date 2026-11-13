// You are given an integer array arr, return the length of a maximum size turbulent subarray of arr.

// A subarray is turbulent if the comparison sign flips between each adjacent pair of elements in the subarray.

// More formally, a subarray [arr[i], arr[i + 1], ..., arr[j]] of arr is said to be turbulent if and only if:

// For i <= k < j:

// arr[k] > arr[k + 1] when k is odd, and
// arr[k] < arr[k + 1] when k is even.
// Or, for i <= k < j:

// arr[k] > arr[k + 1] when k is even, and
// arr[k] < arr[k + 1] when k is odd.

class Solution {
  /**
   * @param {number[]} arr
   * @return {number}
   */
  maxTurbulenceSize(arr: number[]): number {
    console.log("===============");
    if (arr.length <= 1) {
      return arr.length;
    }

    let best = 0;
    let result = 0;
    let prevSign = undefined;

    for (let right = 1; right < arr.length; right++) {
      const currSign = Math.sign(arr[right]! - arr[right - 1]!);
      if (currSign == 0) {
        result = 0;
      } else if (currSign !== prevSign) {
        result++;
      } else if (currSign === prevSign) {
        result = 1;
      }

      console.log(
        `${right}: ${arr[right - 1]!} to ${arr[right]!}, ${prevSign} to ${currSign}, result=${result}`,
      );

      prevSign = currSign;
      best = Math.max(best, result);
    }

    console.log(best + 1);
    return best + 1;
  }

  maxTurbulenceSize2(arr: number[]): number {
    if (arr.length <= 1) {
      return arr.length;
    }

    let result = 0;
    let best = 0;
    let left = 0;
    let signPrev = undefined;

    for (let right = 1; right < arr.length; right++) {
      let signNow = Math.sign(arr[right]! - arr[right - 1]!);
      if (signNow === 0) {
        signPrev = undefined;
        left = right + 1;
      } else if (signNow === 0 || signPrev === signNow) {
        signPrev = signNow;
        left = right - 1;
      } else {
        signPrev = signNow;
        result = right - left + 1;
        best = Math.max(best, result);
      }
    }

    return best;
  }
}

// new Solution().maxTurbulenceSize([2, 1]);
// new Solution().maxTurbulenceSize([2, 3]);
// new Solution().maxTurbulenceSize([2, 2]);
new Solution().maxTurbulenceSize([9, 4, 2, 10, 7, 8, 8, 1, 9]);
new Solution().maxTurbulenceSize([2, 4, 3, 2, 2, 5, 1, 4]);
