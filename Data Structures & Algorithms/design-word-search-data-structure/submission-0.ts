// Design a data structure that supports adding new words and searching for existing words.

// Implement the WordDictionary class:

// void addWord(word) Adds word to the data structure.
// bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

type PrefixTreeNode = {
  children: Map<string, PrefixTreeNode>;
  word: boolean;
};

const LETTERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

class WordDictionary {
  private root: PrefixTreeNode;

  constructor() {
    this.root = {
      children: new Map<string, PrefixTreeNode>(),
      word: false,
    };
  }

  /**
   * @param {string} word
   * @return {void}
   */
  addWord(word: string): void {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i]!;
      if (!curr.children.has(char)) {
        const newNode: PrefixTreeNode = {
          children: new Map<string, PrefixTreeNode>(),
          word: false,
        };
        curr.children.set(char, newNode);
      }
      curr = curr.children.get(char)!;
    }
    curr.word = true;
  }

  /**
   * @param {string} word
   * @return {boolean}
   */
  search(word: string): boolean {
    return this.searchFrom(word, this.root);
  }

  searchFrom(word: string, node: PrefixTreeNode): boolean {
    let curr = node;
    for (let i = 0; i < word.length; i++) {
      const char = word[i]!;

      if (char === ".") {
        for (const letter of LETTERS) {
          if (this.searchFrom(letter + word.substring(i + 1), curr)) {
            return true;
          }
        }
        return false;
      }

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

const wd = new WordDictionary();
wd.addWord("day");
wd.search("..y");
wd.search(".ay");
