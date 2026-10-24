// Given an array nums of unique integers, return all the possible permutations. You may return the answer in any order.

// You should aim for a solution with O(n * n!) time and O(n) space, where n is the size of the input array.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const subResult: number[] = [];

    const explore = (numbers: number[]) => {
      if (numbers.length === 0) {
        result.push([...subResult]);
        return;
      }

      // Take first number in input and push it into subresult.
      // Explore remaining numbers the same way.
      // Until all numbers have been taken.
      // Record the subresult.
      // Push the numbers into the back of the input.
      for (let count = 0; count < numbers.length; count++) {
        const curr = numbers.shift()!;
        subResult.push(curr);
        explore(numbers);
        subResult.pop();
        numbers.push(curr);
      }
    };

    explore(nums);
    return result;
  }
}

new Solution().permute([1, 2, 3]);
