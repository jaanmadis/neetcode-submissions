// You are given the head of a singly linked list head and a positive integer k.

// You must reverse the first k nodes in the linked list, and then reverse the next k nodes, and so on.
// If there are fewer than k nodes left, leave the nodes as they are.

// Return the modified list after reversing the nodes in each group of k.

// You are only allowed to modify the nodes' next pointers, not the values of the nodes.

// class ListNode {
//   val = 0;
//   next: ListNode | null = null;
//   constructor(val = 0, next: ListNode | null = null) {
//     this.val = val;
//     this.next = next;
//   }
// }

class Solution {
  /**
   * @param {ListNode} head
   * @param {number} k
   * @return {ListNode}
   */
  reverseKGroup(head: ListNode | null, k: number): ListNode {
    const reverseUntil = (currHead: ListNode, nextHead: ListNode): ListNode => {
      let curr = currHead;
      let prev = nextHead;
      let next = null;
      while (curr !== null && curr !== nextHead) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next!;
      }
      return prev!;
    };

    let currHead;
    let currTail;
    let nextHead;
    let result = head;

    currHead = head;
    nextHead = head;

    while (true) {
      let i = 0;
      while (i < k && nextHead !== null) {
        nextHead = nextHead!.next;
        i++;
      }

      if (i < k) {
        return result!;
      }

      const newHead = reverseUntil(currHead!, nextHead!);
      if (currTail) {
        currTail.next = newHead;
      } else {
        result = newHead;
      }
      currTail = currHead;
      currHead = nextHead;
    }
  }
}

// const nodeA = new ListNode(10);
// const node9 = new ListNode(9, nodeA);
// const node8 = new ListNode(8, node9);
// const node7 = new ListNode(7, node8);
// const node6 = new ListNode(6, node7);
// const node5 = new ListNode(5, node6);
// const node4 = new ListNode(4, node5);
// const node3 = new ListNode(3, node4);
// const node2 = new ListNode(2, node3);
// const head1 = new ListNode(1, node2);

// new Solution().reverseKGroup(head1, 4);
