// Given the root of a binary tree, return its depth.
// The depth of a binary tree is defined
// as the number of nodes along the longest path from the root node down to the farthest leaf node.

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
  /**
   * @param {TreeNode} root
   * @return {number}
   */

  // Recurse left and right and add max
  maxDepthRecursiveDepthFirst(root: TreeNode | null): number {
    if (root === null) {
      return 0;
    }
    let leftDepth = this.maxDepth(root.left) + 1;
    let rightDepth = this.maxDepth(root.right) + 1;
    return Math.max(leftDepth, rightDepth);
  }

  // Push root to queue, then shift (pop left) all current nodes from queue while pushing all non null children to queue.
  maxDepthBreadthFirst(root: TreeNode | null): number {
    if (root === null) {
      return 0;
    }
    let depth = 0;
    const queue: TreeNode[] = [root];
    while (queue.length !== 0) {
      let len = queue.length;
      while (len > 0) {
        const node = queue.shift();
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        len--;
      }
      depth++;
    }
    return depth;
  }

  // IterativeDepthFirst
  // Push node and its depth into stack. Then pop and add node's children with + 1 depth.
  maxDepth(root: TreeNode | null): number {
    if (root === null) {
      return 0;
    }
    let depth = 1;
    const stack = [{ node: root, depth }];
    while (stack.length !== 0) {
      const item = stack.pop();
      depth = Math.max(depth, item.depth);
      if (item?.node.left) {
        stack.push({ node: item?.node.left, depth: item.depth + 1 });
      }
      if (item?.node.right) {
        stack.push({ node: item?.node.right, depth: item.depth + 1 });
      }
    }
    return depth;
  }
}

new Solution();
