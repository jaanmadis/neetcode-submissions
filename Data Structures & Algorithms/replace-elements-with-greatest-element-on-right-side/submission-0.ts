// You are given an array arr, replace every element in that array with
// the greatest element among the elements to its right,
// and replace the last element with -1.

// After doing so, return the array.

class Solution {
  /**
   * @param {number[]} arr
   * @return {number[]}
   */
  replaceElements(arr: number[]): number[] {
    let j = -1;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i]! > j) {
        const tmp = arr[i];
        arr[i] = j;
        j = tmp!;
      } else {
        arr[i] = j;
      }
    }
    return arr;
  }
}

new Solution().replaceElements([2, 4, 5, 3, 1, 2]);
