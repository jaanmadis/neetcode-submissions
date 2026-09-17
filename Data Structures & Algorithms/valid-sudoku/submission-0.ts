class Solution {
  /**
   * @param {character[][]} board
   * @return {boolean}
   */
  isValidSudoku(board: string[][]): boolean {
    const LEN = 9;

    const elements: Set<string> = new Set<string>();

    for (let i = 0; i < LEN; i++) {
      elements.clear();
      for (let j = 0; j < LEN; j++) {
        if (board[i]![j]! === ".") {
          continue;
        }
        if (elements.has(board[i]![j]!)) {
          return false;
        }
        elements.add(board[i]![j]!);
      }
    }

    for (let i = 0; i < LEN; i++) {
      elements.clear();
      for (let j = 0; j < LEN; j++) {
        if (board[j]![i]! === ".") {
          continue;
        }
        if (elements.has(board[j]![i]!)) {
          return false;
        }
        elements.add(board[j]![i]!);
      }
    }

    const xxx = [0, 3, 6, 9];

    for (let m = 0; m < xxx.length - 1; m++) {
      for (let k = 0; k < xxx.length - 1; k++) {
        elements.clear();
        for (let i = xxx[k]!; i < xxx[k + 1]!; i++) {
          for (let j = xxx[m]!; j < xxx[m + 1]!; j++) {
            if (board[i]![j]! === ".") {
              continue;
            }
            if (elements.has(board[i]![j]!)) {
              return false;
            }
            elements.add(board[i]![j]!);
          }
        }
      }
    }

    return true;
  }
}