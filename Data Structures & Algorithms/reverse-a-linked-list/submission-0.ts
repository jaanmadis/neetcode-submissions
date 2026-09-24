// Given the beginning of a singly linked list head, reverse the list, and return the new beginning of the list.

// class ListNode {
//   public val: number = 0;
//   public next: ListNode | null = null;

//   constructor(val = 0, next: ListNode | null = null) {
//     this.val = val;
//     this.next = next;
//   }
// }

class Solution {
  /**
   * @param {ListNode} head
   * @return {ListNode}
   */
  reverseList(head: ListNode | null): ListNode {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;
    let next: ListNode | null;
    while (curr !== null) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    return prev!;
  }
}

// new Solution().reverseList(
//   new ListNode(0, new ListNode(1, new ListNode(2, new ListNode(3, null)))),
// );
