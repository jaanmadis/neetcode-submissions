// Design a data structure that supports adding new words and searching for existing words.

// Implement the WordDictionary class:

// void addWord(word) Adds word to the data structure.
// bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

type PrefixTreeNode = {
  children: Map<string, PrefixTreeNode>;
  word: boolean;
};

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
    return this.searchFrom(word, 0, this.root);
  }

  searchFrom(word: string, index: number, node: PrefixTreeNode): boolean {
    if (index === word.length) {
      return node.word;
    }

    const char = word[index]!;

    if (char === ".") {
      for (const child of node.children.values()) {
        if (this.searchFrom(word, index + 1, child)) {
          return true;
        }
      }
      return false;
    }

    const child = node.children.get(char);
    if (!child) {
      return false;
    }
    return this.searchFrom(word, index + 1, child);
  }
}

const wd = new WordDictionary();
wd.addWord("day");
wd.search("..y");
wd.search(".ay");
