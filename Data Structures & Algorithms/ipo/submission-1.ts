// A company has limited resources, it can only finish at most k distinct projects before the IPO. Help the company to design the best way to maximize its total capital after finishing at most k distinct projects.

// You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it. Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

// Pick a list of at most k distinct projects from given projects to maximize your final capital, and return the final maximized capital.

// The answer is guaranteed to fit in a 32-bit signed integer.

type Project = {
  profit: number;
  capital: number;
  done: boolean;
};

class Solution {
  /**
   * @param {number} k
   * @param {number} w
   * @param {number[]} profits
   * @param {number[]} capital
   * @return {number}
   */
  findMaximizedCapital(
    k: number,
    w: number,
    profits: number[],
    capital: number[],
  ): number {
    const projects: Project[] = [];
    for (let i = 0; i < profits.length; i++) {
      projects.push({ profit: profits[i]!, capital: capital[i]!, done: false });
    }
    projects.sort((a, b) => {
      const capital = a.capital - b.capital;
      return capital === 0 ? a.profit - b.profit : capital;
    });

    let currentCapital = w;
    while (k > 0) {
      let bestProfit = -Infinity;
      let bestProfitIndex = -1;
      for (let i = 0; i < projects.length; i++) {
        if (projects[i]!.capital > currentCapital) {
          break;
        }
        if (projects[i]!.profit > bestProfit && !projects[i]!.done) {
          bestProfit = projects[i]!.profit;
          bestProfitIndex = i;
        }
      }
      if (bestProfitIndex === -1) {
        break;
      }
      currentCapital += projects[bestProfitIndex]!.profit;
      projects[bestProfitIndex]!.done = true;
      k--;
    }

    return currentCapital;
  }
}

new Solution().findMaximizedCapital(
  4,
  1,
  [7, 1, 5, 3, 8, 7],
  [2, 2, 3, 4, 5, 5],
);
new Solution().findMaximizedCapital(4, 2, [2, 3, 1, 5, 3], [4, 4, 2, 3, 3]);
