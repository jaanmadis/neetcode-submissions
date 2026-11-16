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
    // Find mid.
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
      slow = slow!.next;
      fast = fast!.next!.next;
    }

    // Reverse first half.
    let prev = null;
    let curr = head;
    let next = null;
    while (curr && curr !== slow) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    curr = prev;

    // Travel curr back to head and travel slow to tail while finding best sum.
    let best = 0;
    while (curr && slow) {
      best = Math.max(best, curr.val + slow.val);
      slow = slow.next;
      curr = curr.next;
    }
    return best;
  }

  pairSum2(head: ListNode | null): number {
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
// const n1 = new ListNode(1, n2);
// const n0 = new ListNode(10, n1);

// new Solution().pairSum(n0);
