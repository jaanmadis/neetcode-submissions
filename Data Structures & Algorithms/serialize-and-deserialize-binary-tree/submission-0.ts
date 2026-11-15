// Implement an algorithm to serialize and deserialize a binary tree.

// Serialization is the process of converting an in-memory structure
// into a sequence of bits so that it can be stored or sent across a network to be reconstructed later in another computer environment.

// You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
// There is no additional restriction on how your serialization/deserialization algorithm should work.

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

class Codec {
  /**
   * Encodes a tree to a single string.
   *
   * @param {TreeNode} root
   * @return {string}
   */
  serialize(root: TreeNode | null): string {
    const res = [];
    const que = [];
    que.push(root);
    while (que.length > 0) {
      const node = que.shift();
      res.push(node ? node.val : null);
      if (node) {
        que.push(node.left);
        que.push(node.right);
      }
    }
    return res.join(",");
  }

  /**
   * Decodes your encoded data to tree.
   *
   * @param {string} data
   * @return {TreeNode}
   */
  deserialize(data: string): TreeNode | null {
    const arr = data.split(",");
    if (arr.length === 0 || arr[0] === "") {
      return null;
    }

    const root = new TreeNode(Number(arr.shift()));
    const que = [root];
    while (que.length > 0) {
      const node = que.shift()!;

      const leftValue = arr.shift();
      const left = leftValue === "" ? null : new TreeNode(Number(leftValue));

      const rightValue = arr.shift();
      const right = rightValue === "" ? null : new TreeNode(Number(rightValue));

      node.left = left;
      node.right = right;

      if (left) {
        que.push(left);
      }
      if (right) {
        que.push(right);
      }
    }

    return root;
  }
}

// const n0 = new Codec().serialize(null);
// new Codec().deserialize(n0);

// const n7 = new TreeNode(7);
// const n6 = new TreeNode(6, null, n7);
// const n4 = new TreeNode(4, n6);
// const n5 = new TreeNode(5);
// const n3 = new TreeNode(3, n4, n5);
// const n2 = new TreeNode(2);
// const n1 = new TreeNode(1, n2, n3);

// const s1 = new Codec().serialize(n1);
// console.log(s1);
// new Codec().deserialize(s1);

// const s2 = new Codec().serialize(null);
// console.log(s2);
// new Codec().deserialize(s2);
