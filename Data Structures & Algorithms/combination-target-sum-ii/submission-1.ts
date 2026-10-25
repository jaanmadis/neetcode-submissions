// You are given an array of integers candidates,
// which may contain duplicates, and a target integer target.
// Your task is to return a list of all unique combinations of candidates where the chosen numbers sum to target.

// Each element from candidates may be chosen at most once within a combination.
// The solution set must not contain duplicate combinations.

// You may return the combinations in any order and the order of the numbers in each combination can be in any order.

class Solution {
  /**
   * @param {number[]} candidates
   * @param {number} target
   * @return {number[][]}
   */
  combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a: number, b: number) => a - b);

    const result: number[][] = [];
    const subResult: number[] = [];
    let subResultValue = 0;

    let lastPop: number | undefined;
    const explore = (offset: number) => {
      for (let i = offset; i < candidates.length; i++) {
        const candidate = candidates[i]!;
        if (subResultValue + candidate <= target) {
          if (lastPop === candidate) {
            continue;
          }
          subResult.push(candidate);
          subResultValue += candidate;
          if (subResultValue === target) {
            result.push([...subResult]);
          } else {
            explore(i + 1);
          }
          subResultValue -= candidate;
          lastPop = subResult.pop()!;
        } else if (subResultValue + candidate > target) {
          return;
        }
      }
    };

    explore(0);

    return result;
  }
}

new Solution().combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
