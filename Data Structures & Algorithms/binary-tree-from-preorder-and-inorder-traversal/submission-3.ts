class Solution {
  private inorderMap = new Map<number, number>();
  private preorderIndex = 0;

  buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    this.inorderMap.clear();

    for (let i = 0; i < inorder.length; i++) {
      this.inorderMap.set(inorder[i], i);
    }

    this.preorderIndex = 0;

    return this.build(preorder, 0, inorder.length - 1);
  }

  build(
    preorder: number[],
    left: number,
    right: number
  ): TreeNode | null {
    if (left > right) {
      return null;
    }

    // Preorder tells us the root
    const val = preorder[this.preorderIndex++];
    const root = new TreeNode(val);

    // Inorder tells us where the tree splits
    const mid = this.inorderMap.get(val)!;

    root.left = this.build(preorder, left, mid - 1);
    root.right = this.build(preorder, mid + 1, right);

    return root;
  }
}
