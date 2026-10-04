// Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) in the tree.

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
   * @param {TreeNode} root
   * @param {number} k
   * @return {number}
   */

  kthSmallest(root: TreeNode | null, k: number): number {
    let smallestVisited = 0;
    let result = 0;

    // In-order traversal: for a BST, if you traverse: Left > Node > Right you get the values in sorted order.
    const travel = (node: TreeNode | null): void => {
      if (!node || smallestVisited >= k) {
        return;
      }

      // Travel as far left as you can
      travel(node.left);

      // Then increase the number of smallest visited nodes
      smallestVisited++;

      // Return value if we found the k-th smallest.
      if (smallestVisited === k) {
        result = node.val;
        return;
      }

      // Travel right
      travel(node.right);
    };

    travel(root);
    return result;
  }
}

// const n2 = new TreeNode(2, null, null);
// const n1 = new TreeNode(1, null, n2);
// const n4 = new TreeNode(4, null, null);
// const n3 = new TreeNode(3, n1, n4);

// const n10 = new TreeNode(10, null, null);
// const n8 = new TreeNode(8, null, n10);

// const n5 = new TreeNode(5, n3, n8);

// new Solution().kthSmallest(n5, 6);
