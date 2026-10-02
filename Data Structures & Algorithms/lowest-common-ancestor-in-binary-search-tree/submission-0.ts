// Given a binary search tree (BST) where all node values are unique,
// and two nodes from the tree p and q, return the lowest common ancestor (LCA) of the two nodes.

// The lowest common ancestor between two nodes p and q is the lowest node in a tree T such that both p and q are descendants.
// The ancestor is allowed to be a descendant of itself.

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
  /**
   * @param {TreeNode} root
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {TreeNode}
   */
  lowestCommonAncestor(
    root: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null,
  ) {
    let curr = root;
    while (curr) {
      if (p.val > curr.val && q.val > curr.val) {
        curr = curr.right;
      } else if (p.val < curr.val && q.val < curr.val) {
        curr = curr.left;
      } else {
        return curr;
      }
    }
  }
}
