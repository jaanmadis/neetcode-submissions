// You are given the root of a binary tree, return the inorder traversal of its nodes' values.

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
    inorderTraversal(root: TreeNode | null): number[] {
        let result: number[] = [];
        if (!root) {
            return result;
        }
        result = [...result, ...this.inorderTraversal(root.left)];
        result.push(root.val);
        result = [...result, ...this.inorderTraversal(root.right)];
        return result;
    }
}
