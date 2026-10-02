// Within a binary tree,
// a node x is considered good if the path from the root of the tree to the node x
// contains no nodes with a value greater than the value of node x
// Given the root of a binary tree root, return the number of good nodes within the tree.

// class TreeNode {
//   val: number;
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
   * @return {number}
   */
  private result = 0;

  goodNodes(root: TreeNode | null): number {
    this.result = 0;
    if (root) {
      this.dive(root, root.val);
    }
    return this.result;
  }

  // Track result in instance variable for simplicity.
  // Visit every node.
  // Visited node is good if node.val is larger or equal than largest value encountered on the path so far.

  dive(node: TreeNode | null, currMax: number) {
    if (!node) {
      return;
    }
    if (node.val >= currMax) {
      this.result++;
      currMax = node.val;
    }
    this.dive(node.left, currMax);
    this.dive(node.right, currMax);
  }
}

// const n5 = new TreeNode(2, null, null);
// const n1c = new TreeNode(2, null, null);
// const n3 = new TreeNode(2, null, null);
// const n1a = new TreeNode(2, n3, null);
// const n1b = new TreeNode(2, n1c, n5);
// const n2 = new TreeNode(2, n1a, n1b);

// new Solution().goodNodes(n2);
