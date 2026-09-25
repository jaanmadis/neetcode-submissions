// You are given the heads of two sorted linked lists list1 and list2.
// Merge the two lists into one sorted linked list and return the head of the new sorted linked list.
// The new list should be made up of nodes from list1 and list2.

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
   * @param {ListNode} list1
   * @param {ListNode} list2
   * @return {ListNode}
   */
  mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode {
    // This way we don't need to keep track of head.
    let placeholder = new ListNode(0, null);
    let curr = placeholder;

    let a = list1;
    let b = list2;

    // Exhaust one list first
    while (a !== null && b !== null) {
      if (a.val <= b.val) {
        curr.next = a;
        a = a.next;
      } else {
        curr.next = b;
        b = b.next;
      }
      curr = curr.next;
    }

    // Then attach what's left from other list
    curr.next = a ?? b;

    return placeholder.next;
  }
}