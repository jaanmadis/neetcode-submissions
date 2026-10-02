// The diameter of a binary tree is defined as the length of the longest path between any two nodes within the tree.
// The path does not necessarily have to pass through the root.

// The length of a path between two nodes in a binary tree is the number of edges between the nodes.
// Note that the path can not include the same node twice.

// Given the root of a binary tree root, return the diameter of the tree.

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
   * @return {number}
   */
  private bestDiameter = 0;

  measureDepth(root: TreeNode | null): number {
    if (root === null) {
      return 0;
    }
    // Measure how deep left and right branchs go.
    let left = this.measureDepth(root.left);
    let right = this.measureDepth(root.right);

    // Check if path from left to right could be the widest diameter.
    this.bestDiameter = Math.max(this.bestDiameter, left + right);

    // Return the depth of the deeper branch to parent to do the same logic.
    let deeperBranch = Math.max(left, right) + 1;
    return deeperBranch;
  }

  diameterOfBinaryTree(root: TreeNode | null): number {
    this.bestDiameter = 0;
    this.measureDepth(root);
    return this.bestDiameter;
  }
}

// const n5 = new TreeNode(5, null, null);
// const n4 = new TreeNode(4, null, null);
// const n3 = new TreeNode(3, n5, null);
// const n2 = new TreeNode(2, n3, n4);
// const n1 = new TreeNode(1, null, n2);

// new Solution().diameterOfBinaryTree(n1);

// const n3b = new TreeNode(3, null, null);
// const n2b = new TreeNode(2, null, null);
// const n1b = new TreeNode(1, n2b, n3b);

// new Solution().diameterOfBinaryTree(n1b);
