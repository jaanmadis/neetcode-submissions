// You are given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

// You may return the answer in any order.

class Solution {
  /**
   * @param {number} n
   * @param {number} k
   * @return {number[][]}
   */
  combine(n: number, k: number): number[][] {
    const result: number[][] = [];
    const subResult: number[] = [];

    const explore = (num: number, rem: number) => {
      if (rem === 0) {
        result.push([...subResult]);
        return;
      }
      if (num > n) {
        return;
      }
      subResult.push(num);
      explore(num + 1, rem - 1);
      subResult.pop();
      explore(num + 1, rem);
    };

    explore(1, k);

    return result;
  }
}

new Solution().combine(3, 2);
