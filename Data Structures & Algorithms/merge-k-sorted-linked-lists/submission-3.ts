// You are given an array of k linked lists lists, where each list is sorted in ascending order.

// Return the sorted linked list that is the result of merging all of the individual linked lists.

// You should aim for a solution as good or better than O(n * k) time and O(1) space,
// where k is the total number of lists and n is the total number of nodes across all lists.

// class ListNode {
//   val = 0;
//   next: ListNode | null;

//   constructor(val = 0, next: ListNode | null = null) {
//     this.val = val;
//     this.next = next;
//   }
// }

class Solution {
  /**
   * @param {ListNode[]} lists
   * @return {ListNode}
   */
  merge2Lists(headA: ListNode, headB: ListNode): ListNode {
    let currA = headA;
    let currB = headB;
    let dummy = new ListNode();
    let curr = dummy;
    while (currA && currB) {
      if (currA.val < currB.val) {
        curr.next = currA;
        currA = currA.next!;
        curr = curr.next;
        curr.next = null;
      } else {
        curr.next = currB;
        currB = currB.next!;
        curr = curr.next;
        curr.next = null;
      }
    }
    curr.next = currA ?? currB;
    return dummy.next!;
  }

  mergeKLists(lists: ListNode[]): ListNode | null {
    if (lists.length === 0) {
      return null;
    }

    while (lists.length !== 1) {
      let lists2 = [];
      while (lists.length >= 2) {
        const list1 = lists.pop();
        const list2 = lists.pop();
        lists2.push(this.merge2Lists(list1, list2));
      }
      if (lists.length === 1) {
        lists2.push(lists.pop());
      }
      lists = lists2;
    }

    return lists[0];
  }

  mergeKLists2(lists: ListNode[]): ListNode | null {
    if (lists.length === 0) {
      return null;
    }
    let dummy = new ListNode(-Infinity, null);
    let curr = dummy;

    while (true) {
      let smallestIndex = -1;
      let smallestValue = Infinity;

      for (let i = 0; i < lists.length; i++) {
        const next = lists[i];
        if (next && smallestValue > next.val) {
          smallestIndex = i;
          smallestValue = next.val;
          if (smallestValue === curr.val) {
            break;
          }
        }
      }

      if (smallestIndex === -1) {
        break;
      }

      curr.next = new ListNode(lists[smallestIndex]!.val, null);
      curr = curr.next;
      lists[smallestIndex] = lists[smallestIndex]!.next!;
    }
    return dummy.next;
  }
}

// new Solution().merge2Lists(
//   new ListNode(1, new ListNode(3, null)),
//   new ListNode(2, new ListNode(4)),
// );
