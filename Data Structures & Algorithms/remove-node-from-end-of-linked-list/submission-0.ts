// Given the head of a linked list and an integer n, remove the nth node from the end of the list and return its head.
// O(n) time, O(1) space

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
  /**
   * @param {ListNode} head
   * @param {number} n
   * @return {ListNode}
   */
  removeNthFromEnd(head: ListNode | null, n: number): ListNode {
    const dummy = new ListNode(0, head);
    let slow = dummy;
    let fast = dummy;
    let i = 0;
    while (fast && i !== n + 1) {
      fast = fast.next;
      i++;
    }

    while (fast) {
      slow = slow.next;
      fast = fast.next;
    }

    const remove = slow.next;
    slow.next = remove.next;

    return remove !== head ? head : head.next;
  }
}
