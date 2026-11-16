// A prefix tree (also known as a trie) is a tree data structure used to efficiently store and retrieve keys in a set of strings. Some applications of this data structure include auto-complete and spell checker systems.

// Implement the PrefixTree class:

// PrefixTree() Initializes the prefix tree object.
// void insert(String word) Inserts the string word into the prefix tree.
// boolean search(String word) Returns true if the string word is in the prefix tree (i.e., was inserted before), and false otherwise.
// boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

type PrefixTreeNode = {
  children: Map<string, PrefixTreeNode>;
  word: boolean;
};

class PrefixTree {
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
  insert(word: string): void {
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
      if (i === word.length - 1) {
        curr.word = true;
      }
    }
  }

  /**
   * @param {string} word
   * @return {boolean}
   */
  search(word: string): boolean {
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

  /**
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix: string): boolean {
    let curr = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i]!;
      if (!curr.children.has(char)) {
        return false;
      }
      curr = curr.children.get(char)!;
    }
    return true;
  }
}

new PrefixTree().insert("apple");
