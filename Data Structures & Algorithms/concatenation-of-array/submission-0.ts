// You are given an integer array nums of length n. 
// Create an array ans of length 2n where ans[i] == nums[i] and 
// ans[i + n] == nums[i] for 0 <= i < n (0-indexed).

// Specifically, ans is the concatenation of two nums arrays.

// Return the array ans.

class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    getConcatenation(nums: number[]): number[] {
        const ans: number[] = new Array<number>(nums.length * 2);
        for (let i = 0; i < nums.length; i++) {
            const n = nums[i]!;
            ans[i] = n;
            ans[i + nums.length] = n;
        }
        return ans
    }
}
