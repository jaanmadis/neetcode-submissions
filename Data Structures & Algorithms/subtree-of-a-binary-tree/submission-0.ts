// Given the roots of two binary trees root and subRoot, return true if there is a subtree of root
// with the same structure and node values of subRoot and false otherwise.

// A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants.
// The tree tree could also be considered as a subtree of itself.

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
   * @param {TreeNode} subRoot
   * @return {boolean}
   */

  // DFS + tree comparison: traverse root; at matching values, check if the two trees are identical.
  isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (!root && !subRoot) {
      return true;
    } else if (root && subRoot) {
      if (root.val === subRoot.val) {
        if (this.isSameTree(root, subRoot)) {
          return true;
        }
      }
      return (
        this.isSubtree(root.left, subRoot) ||
        this.isSubtree(root.right, subRoot)
      );
    } else {
      return false;
    }
  }

  // Re-use isSameTree from other puzzle.
  isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) {
      return true;
    } else if (p && q) {
      if (p.val === q.val) {
        return (
          this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right)
        );
      }
      return false;
    } else {
      return false;
    }
  }
}

// const n2 = new TreeNode(2, null, null);
// const n1 = new TreeNode(1, null, n2);
// const n4 = new TreeNode(4, null, null);
// const n3 = new TreeNode(33, n1, n4);

// const n10 = new TreeNode(10, null, null);
// const n8 = new TreeNode(33, null, n10);

// const n5 = new TreeNode(5, n3, n8);

// new Solution().isSubtree(n3, n8);
