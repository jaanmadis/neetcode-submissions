// You are given the root node of a binary search tree (BST) and a value val to insert into the tree.
// Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

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
   * @param {number} val
   * @return {TreeNode}
   */
  insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    if (!root) {
      return new TreeNode(val);
    }
    if (root.val > val) {
      root.left = this.insertIntoBST(root.left, val);
    } else {
      root.right = this.insertIntoBST(root.right, val);
    }
    return root;
  }
}

// const node1 = new TreeNode(1);
// const node4 = new TreeNode(4);
// const node3 = new TreeNode(3, node1, node4);
// const node9 = new TreeNode(9);
// const node5 = new TreeNode(5, node3, node9);

// new Solution().insertIntoBST(node5, 2);
