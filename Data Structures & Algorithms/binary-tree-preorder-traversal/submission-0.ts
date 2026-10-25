// You are given the root of a binary tree, return the preorder traversal of its nodes' values.

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
   * @return {number[]}
   */
  preorderTraversal(root: TreeNode | null): number[] {
    let result: number[] = [];
    if (!root) {
      return result;
    }
    result.push(root.val);
    result = [...result, ...this.preorderTraversal(root.left)];
    result = [...result, ...this.preorderTraversal(root.right)];
    return result;
  }
}
