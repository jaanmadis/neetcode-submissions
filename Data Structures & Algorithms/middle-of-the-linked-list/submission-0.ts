// You are given the head of a singly linked list, return the middle node of the linked list.

// If there are two middle nodes, return the second middle node.

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
   * @return {ListNode}
   */
  middleNode(head: ListNode | null): ListNode {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
      slow = slow!.next;
      fast = fast!.next!.next;
    }
    return slow!;
  }
}

// const n5 = new ListNode(5);
// const n4 = new ListNode(4, n5);
// const n3 = new ListNode(3, n4);
// const n2 = new ListNode(2, n3);
// const n1 = new ListNode(1, n2);

// new Solution().middleNode(n1);
