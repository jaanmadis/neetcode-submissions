// You are given an array nums, that might contain duplicates , return all possible unique permutations in any order.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  permuteUnique(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];
    const subResult: number[] = [];
    const used = Array(nums.length).fill(false);

    const explore = () => {
      if (subResult.length === nums.length) {
        result.push([...subResult]);
        return;
      }
      for (let i = 0; i < nums.length; i++) {
        if (used[i]) {
          continue;
        }
        if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
          continue;
        }
        used[i] = true;
        subResult.push(nums[i]!);
        explore();
        subResult.pop();
        used[i] = false;
      }
    };

    explore();
    return result;
  }

  permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const subResult: number[] = [];
    const used = Array(nums.length).fill(false);

    const explore = () => {
      if (subResult.length === nums.length) {
        result.push([...subResult]);
        return;
      }
      for (let i = 0; i < nums.length; i++) {
        if (used[i]) {
          continue;
        }
        used[i] = true;
        subResult.push(nums[i]!);
        explore();
        subResult.pop();
        used[i] = false;
      }
    };

    explore();
    return result;
  }

  permuteUnique2(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);

    let result: number[][] = [[]];

    for (const num of nums) {
      const next: number[][] = [];
      for (const perm of result) {
        for (let i = 0; i <= perm.length; i++) {
          if (i > 0 && perm[i - 1] === num) {
            break;
          }
          const copy = [...perm];
          copy.splice(i, 0, num);
          next.push(copy);
        }
      }
      result = next;
    }

    result.forEach((r) => console.log(r));

    return result;
  }

  permute2(nums: number[]): number[][] {
    // Start with empty array in result.
    let result: number[][] = [[]];
    for (const num of nums) {
      const nextResult: number[][] = [];
      // For each item in result create copies.
      // and in each copy add num into every possible position.
      // eg. [1,2] -> [3,1,2],[1,3,2],[1,2,3]
      // Store all these copies in next result.
      // Then replace result with nextResult.
      for (const perm of result) {
        for (let i = 0; i <= perm.length; i++) {
          const copy = [...perm];
          copy.splice(i, 0, num);
          nextResult.push(copy);
        }
      }
      result = nextResult;
    }
    return result;
  }
}

// new Solution().permuteUnique([1, 2, 3, 4]);

// new Solution().permuteUnique([2, 3, 1, 3]);
new Solution().permute([1, 2, 3, 4]);
