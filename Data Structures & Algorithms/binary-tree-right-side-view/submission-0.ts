// You are given the root of a binary tree.
// Return only the values of the nodes that are visible from the right side of the tree, ordered from top to bottom.

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
   * @return {number[]}
   */
  rightSideView(root: TreeNode | null): number[] {
    const result: number[] = [];

    // Use depth first search that prioritizes the right child,
    // so the first node encountered at each depth is the node visible from the right side.
    const travel = (node: TreeNode | null, currentDepth: number) => {
      if (!node) {
        return;
      }
      if (result[currentDepth] === undefined) {
        result.push(node.val);
      }
      travel(node.right, currentDepth + 1);
      travel(node.left, currentDepth + 1);
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

// new Solution().rightSideView(n5);
