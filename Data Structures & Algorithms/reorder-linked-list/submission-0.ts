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
   * @return {void}
   */
  reorderList(head: ListNode | null): void {
    // Find the middle of the list using slow/fast.
    let slow = head;
    let fast = head.next;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    let second = slow.next;

    // Disconnect first half from second.
    slow.next = null;

    // Reverse second half.
    let curr = second;
    let prev = null;
    let next = null;
    while (curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    second = prev;

    // Merge first and second.
    let currA = head;
    let currB = second;
    let nextA;
    let nextB;

    while (currA && currB) {
      nextA = currA.next;
      nextB = currB.next;
      currA.next = currB;
      currB.next = nextA;
      currA = nextA;
      currB = nextB;
    }
  }
}