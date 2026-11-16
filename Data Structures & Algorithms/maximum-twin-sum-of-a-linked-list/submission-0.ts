// In a linked list of size n,
// where n is even, the i-th node (0-indexed) of the linked list is known as the twin of the (n-1-i)-th node,
// if 0 <= i <= (n / 2) - 1.

// For example, if n = 4, then node 0 is the twin of node 3,
// and node 1 is the twin of node 2.
// These are the only nodes with twins for n = 4.
// The twin sum is defined as the sum of a node and its twin.

// You are given the head of a linked list with even length, return the maximum twin sum of the linked list.

// class ListNode {
//   val: number;
//   next: ListNode | null;
//   constructor(val = 0, next: ListNode | null = null) {
//     this.val = val;
//     this.next = next;
//   }
// }

class Solution {
  /**
   * @param {ListNode} head
   * @return {number}
   */
  pairSum(head: ListNode | null): number {
    let slow = head;
    let fast = head;
    const sums = [];
    while (fast && fast.next) {
      sums.push(slow!.val);
      slow = slow!.next;
      fast = fast!.next!.next;
    }
    let best = 0;
    let i = sums.length - 1;
    while (slow) {
      sums[i]! += slow.val;
      best = Math.max(best, sums[i]!);
      slow = slow.next;
      i--;
    }
    return best;
  }
}

// const n5 = new ListNode(50);
// const n4 = new ListNode(4, n5);
// const n3 = new ListNode(3, n4);
// const n2 = new ListNode(2, n3);

// new Solution().pairSum(n2);
