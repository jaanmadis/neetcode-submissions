// Given a binary tree root,
// return the level order traversal of it as a nested list,
// where each sublist contains the values of nodes at a particular level in the tree,
// from left to right.

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
   * @return {number[][]}
   */
  levelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];

    // Visit every node recursively, add each node's value into the array corresponding to its depth.
    const travel = (node: TreeNode | null, currLevel: number) => {
      if (!node) {
        return;
      }
      if (result[currLevel] === undefined) {
        result[currLevel] = [];
      }
      result[currLevel].push(node.val);
      travel(node.left, currLevel + 1);
      travel(node.right, currLevel + 1);
    };

    travel(root, 0);

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

// new Solution().levelOrder(n5);
