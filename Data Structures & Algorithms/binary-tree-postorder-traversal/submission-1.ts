// You are given the root of a binary tree, return the postorder traversal of its nodes' values.

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
  postorderTraversal(root: TreeNode | null): number[] {
    let result: number[] = [];
    if (!root) {
      return result;
    }
    result = [...result, ...this.postorderTraversal(root.left)];
    result = [...result, ...this.postorderTraversal(root.right)];
    result.push(root.val);
    return result;
  }
}
