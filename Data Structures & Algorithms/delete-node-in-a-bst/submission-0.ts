// You are given a root node reference of a BST and a key, delete the node with the given key in the BST, if present.
// Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:

// Search for a node to remove.
// If the node is found, delete the node.

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
   * @param {number} key
   * @return {TreeNode}
   */
  deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    if (!root) {
      return null;
    }
    if (root.val === key) {
      if (!root.left) {
        return root.right;
      } else {
        let newParent = root.left;
        while (newParent && newParent.right) {
          newParent = newParent.right;
        }
        newParent.right = root.right;
        return root.left;
      }
    }
    if (root.val > key) {
      root.left = this.deleteNode(root.left, key);
    } else {
      root.right = this.deleteNode(root.right, key);
    }
    return root;
  }
}

// const node1 = new TreeNode(1);
// const node4 = new TreeNode(4);
// const node3 = new TreeNode(3, node1, node4);
// const node9 = new TreeNode(9);
// const node5 = new TreeNode(5, node3, node9);

// new Solution().deleteNode(node5, 3);
