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
    let result = root!.val;

    const explore = (node: TreeNode | null): Exploration => {
      if (node === null) {
        return { val: 0, leftSum: 0, rightSum: 0 };
      }

      let left = explore(node.left);
      let right = explore(node.right);

      // Go to child and left or child and right or child and stay or don't do there at all.

      let bestLeft = Math.max(left.leftSum, left.rightSum, left.val, 0);
      let bestRight = Math.max(right.leftSum, right.rightSum, right.val, 0);

    //   console.log(
    //     `from ${node.val} if we go left, then best we can get is ${bestLeft}`,
    //   );

    //   console.log(
    //     `from ${node.val} if we go right, then best we can get is ${bestRight}`,
    //   );

      result = Math.max(result, bestLeft + bestRight + node.val);

    //   console.log(`best result so far ${result}`);

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