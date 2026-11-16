// Given a 2-D grid of characters board and a list of strings words,
// return all words that are present in the grid.

// For a word to be present it must be possible to form the word with a path in the board with horizontally or vertically neighboring cells.
// The same cell may not be used more than once in a word.

type PrefixTreeNode = {
  children: Map<string, PrefixTreeNode>;
  word: string;
};

class PrefixTree {
  root: PrefixTreeNode;

  constructor() {
    this.root = {
      children: new Map<string, PrefixTreeNode>(),
      word: "",
    };
  }

  insert(word: string) {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i]!;
      if (!curr.children.has(char)) {
        const newNode = {
          children: new Map<string, PrefixTreeNode>(),
          word: "",
        };
        curr.children.set(char, newNode);
      }
      curr = curr.children.get(char)!;
    }
    curr.word = word;
  }

  search(word: string) {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i]!;
      if (!curr.children.has(char)) {
        return false;
      }
      curr = curr.children.get(char)!;
      if (i === word.length - 1) {
        return curr.word;
      }
    }
    return false;
  }
}

class Solution {
  /**
   * @param {character[][]} board
   * @param {string[]} words
   * @return {string[]}
   */
  findWords(board: string[][], words: string[]): string[] {
    const ROWS = board.length;
    const COLS = board[0]!.length;

    const pt = new PrefixTree();
    for (const word of words) {
      pt.insert(word);
    }

    const result: string[] = [];

    const search = (row: number, col: number, ptn: PrefixTreeNode) => {
      const char = board[row]![col]!;
      if (char === "~") {
        return;
      }

      const child = ptn.children.get(char);
      if (!child) {
        return;
      }

      if (child.word) {
        result.push(child.word);
        child.word = "";
      }

      const directions = [];
      if (row > 0) {
        directions.push({ row: row - 1, col });
      }
      if (col > 0) {
        directions.push({ row, col: col - 1 });
      }
      if (row < ROWS - 1) {
        directions.push({ row: row + 1, col });
      }
      if (col < COLS - 1) {
        directions.push({ row, col: col + 1 });
      }

      board[row]![col]! = "~";
      for (const direction of directions) {
        search(direction.row, direction.col, child);
      }
      board[row]![col]! = char;
    };

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i]!.length; j++) {
        search(i, j, pt.root);
      }
    }

    return result;
  }
}

new Solution().findWords(
  [
    ["a", "b", "c", "d"],
    ["s", "a", "a", "t"],
    ["a", "c", "k", "e"],
    ["a", "c", "d", "n"],
  ],
  ["bat", "cat", "back", "backend", "stack"],
);
