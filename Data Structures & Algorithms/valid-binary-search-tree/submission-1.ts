// Given the root of a binary tree, return true if it is a valid binary search tree, otherwise return false.

// A valid binary search tree satisfies the following constraints:

// The left subtree of every node contains only nodes with keys less than the node's key.
// The right subtree of every node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees are also binary search trees.

// class TreeNode {
//   val: number = 0;
//   left: TreeNode | null;
//   right: TreeNode | null;

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
  isValidBST(root: TreeNode | null): boolean {
    return this.eval(root, null, null);
  }

  eval(node: TreeNode | null, min: number | null, max: number | null) {
    if (node === null) {
      return true;
    }

    if (min !== null && node.val <= min) {
      return false;
    }

    if (max !== null && node.val >= max) {
      return false;
    }

    if (!this.eval(node.left, min, node.val)) {
      return false;
    }
    if (!this.eval(node.right, node.val, max)) {
      return false;
    }

    return true;
  }
}

// const n1 = new TreeNode(1, null, null);
// const n3 = new TreeNode(3, null, null);
// const n2 = new TreeNode(2, n1, n3);

// new Solution().isValidBST(n2);
