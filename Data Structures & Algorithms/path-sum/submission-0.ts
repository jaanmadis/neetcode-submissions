// You are given the root of a binary tree and an integer targetSum,
// return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.
// A leaf is a node with no children.

// class TreeNode {
//   val = 0;
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
   * @param {number} targetSum
   * @return {boolean}
   */
  hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root) {
      return false;
    }

    targetSum = targetSum - root.val;
    if (targetSum === 0 && root.left === null && root.right === null) {
      return true;
    }

    if (this.hasPathSum(root.left, targetSum)) {
      return true;
    }
    if (this.hasPathSum(root.right, targetSum)) {
      return true;
    }

    return false;
  }
}

// const nodeNeg5 = new TreeNode(-5);
// const nodePos15 = new TreeNode(15, nodeNeg5);
// const nodePos5 = new TreeNode(5);
// const nodePos20 = new TreeNode(20, nodePos15, nodePos5);
// const nodePos10 = new TreeNode(10);
// const nodeNeg15 = new TreeNode(-15, nodePos10, nodePos20);

// new Solution().hasPathSum(nodeNeg15, 15);
