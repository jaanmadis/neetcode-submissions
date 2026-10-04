// You are given a non-empty array of integers nums. Every integer appears twice except for one.

// Return the integer that appears only once.

// You must implement a solution with 
// O(n) runtime complexity and use only 
// O(1) extra space.

class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    singleNumber(nums: number[]): number {
        let result = 0;
        for (let num of nums) {
            result = result ^ num;
        }
        return result;
    }
}
