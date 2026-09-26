// You are given the root of a binary tree root. Invert the binary tree and return its root.

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
   * @return {TreeNode}
   */
  invertTree(root: TreeNode | null): TreeNode | null {
    if (!root) {
        return null;
    }
    this.invertTree(root.left);
    this.invertTree(root.right);
    const left = root.left;
    const right = root.right;
    root.left = right;
    root.right = left;
    return root;
  }
}
