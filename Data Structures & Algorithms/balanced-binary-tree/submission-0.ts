// Given a binary tree, return true if it is height-balanced and false otherwise.
// A height-balanced binary tree is defined as a binary tree
// in which the left and right subtrees of every node differ in height by no more than 1.

// class TreeNode {
//   val: number = 0;
//   left: TreeNode | null = null;
//   right: TreeNode | null = null;
//   constructor(
//     val = 0,
//     left: TreeNode | null = null,
//     right: TreeNode | null = null,
//   ) {
//     this.val = val;
//     this.left = left;
//     this.right = right;
//   }
// }

class Solution {
  /**
   * @param {TreeNode} root
   * @return {boolean}
   */
  isBalanced(root: TreeNode | null): boolean {
    let result = true;

    // Post-order DFS:
    // calculate each subtree's height, and return false if any node's left/right heights differ by more than 1.
    const getHeight = (node: TreeNode | null): number => {
      if (!node || !result) {
        return 0;
      }
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) {
        result = false;
      }
      return Math.max(leftHeight, rightHeight) + 1;
    };

    getHeight(root);

    return result;
  }
}

// const n2 = new TreeNode(2, null, null);
// const n1 = new TreeNode(1, null, n2);
// const n4 = new TreeNode(4, null, null);
// const n3 = new TreeNode(3, n1, n4);

// const n10 = new TreeNode(10, null, null);
// const n8 = new TreeNode(8, null, n10);

// const n5 = new TreeNode(5, n3, n8);

// new Solution().isBalanced(n5);
