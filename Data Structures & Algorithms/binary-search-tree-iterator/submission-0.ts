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

class BSTIterator {
  /**
   * @constructor
   * @param {TreeNode} root
   */
  private print: TreeNode[] = [];
  private ptr = 0;

  // pre        root-left-right
  // post       left-right-root
  // in         left-root-right
  constructor(root: TreeNode | null) {
    const stack: TreeNode[] = [];
    let curr = root!;
    while (curr || stack.length > 0) {
      if (curr) {
        stack.push(curr);
        curr = curr.left!;
      } else {
        curr = stack.pop()!;
        this.print.push(curr);
        curr = curr.right!;
      }
    }
  }

  /**
   * @return {number}
   */
  next(): number {
    const value = this.print[this.ptr]!.val;
    this.ptr++;
    return value;
  }

  /**
   * @return {boolean}
   */
  hasNext(): boolean {
    return this.print.length > 0 && this.ptr < this.print.length;
  }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

// const n0 = new TreeNode(0);
// const n1 = new TreeNode(1, n0);
// const n2 = new TreeNode(2);
// const n3 = new TreeNode(3, n1, n2);
// const n9 = new TreeNode(9);
// const n20 = new TreeNode(20);
// const n15 = new TreeNode(15, n9, n20);
// const n7 = new TreeNode(7, n3, n15);

// new BSTIterator(n7);
