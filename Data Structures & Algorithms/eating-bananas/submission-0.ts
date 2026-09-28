// You are given an integer array piles where piles[i] is the number of bananas in the ith pile.
// You are also given an integer h, which represents the number of hours you have to eat all the bananas.

// You may decide your bananas-per-hour eating rate of k.
// Each hour, you may choose a pile of bananas and eats k bananas from that pile.
// If the pile has less than k bananas, you may finish eating the pile but you can not eat from another pile in the same hour.

// Return the minimum integer k such that you can eat all the bananas within h hours.

class Solution {
  /**
   * @param {number[]} piles
   * @param {number} h
   * @return {number}
   */
  minEatingSpeed(piles: number[], h: number): number {
    let left = 1;
    let right = Math.max(...piles);
    let best = 0;
    // Try speeds between 1 and max pile size using binary search.
    while (left <= right) {
      const speed = left + Math.floor((right - left) / 2);

      // Measure time it takes to eat all piles with current speed.
      let time = 0;
      for (const pile of piles) {
        time += Math.ceil(pile / speed);
      }

      // Decrease speed if we finished under the time limit h, else increase speed.
      if (time <= h) {
        right = speed - 1;
        best = speed;
      } else {
        left = speed + 1;
      }
    }
    return best;
  }
}

new Solution().minEatingSpeed([25, 10, 23, 4], 4);
new Solution().minEatingSpeed([1, 4, 3, 2], 9);
