// You are given two integer arrays preorder and inorder.

// preorder is the preorder traversal of a binary tree
// inorder is the inorder traversal of the same tree
// Both arrays are of the same size and consist of unique values.
// Rebuild the binary tree from the preorder and inorder traversals and return its root.

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
   * @param {number[]} preorder
   * @param {number[]} inorder
   * @return {TreeNode}
   */
  buildTree(preorder: number[], inorder: number[]): TreeNode {
    //        1
    //       / \
    //      2   3
    //     / \
    //    4   5
    //   /     \
    //  6       7
    // inorder      64257 1 3
    // preorder     1 24657 3

    const inorderMap = new Map<number, number>();
    for (let i = 0; i < inorder.length; i++) {
      inorderMap.set(inorder[i]!, i);
    }

    let preorderIndex = 0;

    const build = (left: number, right: number): TreeNode | null => {
      if (left > right) {
        return null;
      }
      const rootValue = preorder[preorderIndex];
      preorderIndex++;

      const root = new TreeNode(rootValue);
      const middle = inorderMap.get(root.val)!;

      root.left = build(left, middle - 1);
      root.right = build(middle + 1, right);

      return root;
    };

    return build(0, inorder.length - 1)!;
  }
}

// new Solution().buildTree([1, 2, 4, 6, 5, 7, 3], [6, 4, 2, 5, 7, 1, 3]);
