// You are given two non-empty linked lists, l1 and l2, where each represents a non-negative integer.

// The digits are stored in reverse order, e.g. the number 321 is represented as 1 -> 2 -> 3 -> in the linked list.

// Each of the nodes contains a single digit.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Return the sum of the two numbers as a linked list.

// 1 <= l1.length, l2.length <= 100

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
   * @param {ListNode} l1
   * @param {ListNode} l2
   * @return {ListNode}
   */
  addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode {

    // Lists area already ordered least significant digit first;
    let ptr1 = l1;
    let ptr2 = l2;
    let carry = 0;
    let prev = null;
    let head = null;

    // Loop though both lists, length can differ;
    while (ptr1 !== null || ptr2 !== null) {
      const sum = (ptr1 ? ptr1.val : 0) + (ptr2 ? ptr2.val : 0) + carry;
      carry = 0;

      const curr = new ListNode(0, null);
      if (prev) {
        prev.next = curr;
      } else {
        head = curr;
      }

      // Carry the 1 if needed;
      if (sum < 10) {
        curr.val = sum;
      } else {
        curr.val = sum - 10;
        carry = 1;
      }

      ptr1 = ptr1 ? ptr1.next : null;
      ptr2 = ptr2 ? ptr2.next : null;
      prev = curr;
    }

    // Add final node if we still have carry;
    if (carry === 1) {
      prev.next = new ListNode(carry, null);
    }

    return head;
  }
}