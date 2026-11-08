// Given the root of a non-empty binary tree, return the maximum path sum of any non-empty path.

// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them.
// A node can not appear in the sequence more than once. The path does not necessarily need to include the root.

// The path sum of a path is the sum of the node's values in the path.

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

type Exploration = {
  val: number;
  leftSum: number;
  rightSum: number;
};

class Solution {
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  maxPathSum(root: TreeNode | null): number {
    // Initialize with root value so the result is valid even when all nodes are negative.
    let result = root!.val;

    // A maximum path can pass through any node, using both its left and right subtrees. Doesn't have to be root.
    const explore = (node: TreeNode | null): Exploration => {
      if (node === null) {
        return { val: 0, leftSum: 0, rightSum: 0 };
      }

      let left = explore(node.left);
      let right = explore(node.right);

      // For each child, choose its best contribution:
      // (1) extend childs left branch or (2) extend childs right branch or (3) take only the child or (4) ignore it.

      let bestLeft = Math.max(left.leftSum, left.rightSum, left.val, 0);
      let bestRight = Math.max(right.leftSum, right.rightSum, right.val, 0);

      // Check if this node could be the one that has both subtrees in the result.
      result = Math.max(result, bestLeft + bestRight + node.val);

      // Return best contributions this node can make.
      return {
        val: node.val,
        leftSum: bestLeft + node.val,
        rightSum: bestRight + node.val,
      };
    };

    explore(root);

    return result;
  }
}

// const nm3 = new TreeNode(3);
// const nm2 = new TreeNode(2);
// const nm1 = new TreeNode(1, nm2, nm3);

// new Solution().maxPathSum(nm1);

// const nm5 = new TreeNode(-5);
// const nm3 = new TreeNode(-3);
// const np15 = new TreeNode(15, nm5, nm3);
// const np5 = new TreeNode(5);
// const np20 = new TreeNode(20, np15, np5);
// const np10 = new TreeNode(10);
// const nm15 = new TreeNode(-15, np10, np20);

// new Solution().maxPathSum(nm15);
