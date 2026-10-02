// You are given the head of a linked list of length n.
// Unlike a singly linked list, each node contains an additional pointer random,
// which may point to any node in the list, or null.

// Create a deep copy of the list.

// The deep copy should consist of exactly n new nodes, each including:

// The original value val of the copied node
// A next pointer to the new node corresponding to the next pointer of the original node
// A random pointer to the new node corresponding to the random pointer of the original node
// Note: None of the pointers in the new list should point to nodes in the original list.

// Return the head of the copied linked list.

// In the examples, the linked list is represented as a list of n nodes.
// Each node is represented as a pair of [val, random_index] where random_index is the index of the node (0-indexed)
// that the random pointer points to, or null if it does not point to any node.

// class Node {
//   public val = 0;
//   public next: Node | null = null;
//   public random: Node | null = null;

//   constructor(val: number, next = null, random = null) {
//     this.val = val;
//     this.next = next;
//     this.random = random;
//   }
// }

class Solution {
  /**
   * @param {Node} head
   * @return {Node}
   */
  copyRandomList(head: Node | null): Node | null {
    if (!head) {
      return null;
    }

    const map: Map<Node, Node> = new Map<Node, Node>();
    let curr: Node | null = head;

    while (curr !== null) {
      if (!map.has(curr)) {
        map.set(curr, new Node(curr.val, null, null));
      }
      const currCopy = map.get(curr)!;

      if (curr.next) {
        if (!map.has(curr.next)) {
          map.set(curr.next, new Node(curr.next.val, null, null));
        }
        currCopy.next = map.get(curr.next)!;
      }

      if (curr.random) {
        if (!map.has(curr.random)) {
          map.set(curr.random, new Node(curr.random.val, null, null));
        }
        currCopy.random = map.get(curr.random)!;
      }

      curr = curr.next;
    }

    return map.get(head)!;
  }
}

// const n3 = new Node(3, null, null);
// const n7 = new Node(7, null, null);
// const n4 = new Node(4, null, null);
// const n5 = new Node(5, null, null);

// n3.next = n7;
// n7.next = n4;
// n4.next = n5;

// n7.random = n5;
// n4.random = n3;
// n5.random = n7;

// new Solution().copyRandomList(n3);
