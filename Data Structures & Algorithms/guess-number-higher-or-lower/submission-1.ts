// We are playing the Guess Game. The game is as follows:

// I pick a number from 1 to n. You have to guess which number I picked.

// Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

// You call a pre-defined API int guess(int num), which returns three possible results:

// 0: your guess is equal to the number I picked (i.e. num == pick).
// -1: Your guess is higher than the number I picked (i.e. num > pick).
// 1: Your guess is lower than the number I picked (i.e. num < pick).

// Return the number that I picked.

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * function guess(num) {}
 */

class Solution {
  /**
   * @param {number} n
   * @return {number}
   */
  guessNumber(n: number): number {
    let left = 1;
    let right = n;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      const currGuess = guess(mid);
      if (currGuess === 0) {
        return mid;
      } else if (currGuess === -1) {
        right = mid - 1;
      } else if (currGuess === 1) {
        left = mid + 1;
      }
    }
    return -1;
  }
}