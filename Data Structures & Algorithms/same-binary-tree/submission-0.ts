// Given the roots of two binary trees p and q, return true if the trees are equivalent, otherwise return false.
// Two binary trees are considered equivalent if they share the exact same structure and the nodes have the same values.

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
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {boolean}
   */
  isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    // Both empty: same (sub)tree
    if (!p && !q) {
      return true;
      // Both exist: check value and check both lefts and both rights
    } else if (p && q) {
      if (p.val !== q.val) {
        return false;
      }
      return (
        this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right)
      );
      // Only one exists: not the same (sub)tree
    } else {
      return false;
    }
  }
}

// const n2 = new TreeNode(2, null, null);
// const n1 = new TreeNode(1, null, n2);
// const n4 = new TreeNode(4, null, null);
// const n3 = new TreeNode(3, n1, n4);

// const n10 = new TreeNode(10, null, null);
// const n8 = new TreeNode(8, null, n10);

// const n5 = new TreeNode(5, n3, n8);

// new Solution().isSameTree(n5, n5);
