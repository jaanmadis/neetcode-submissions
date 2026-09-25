// Given the beginning of a linked list head, 
// return true if there is a cycle in the linked list. Otherwise, return false.
// There is a cycle in a linked list if at least one node in the list can be visited again by following the next pointer.
//
// Internally, index determines the index of the beginning of the cycle, if it exists. 
// The tail node of the list will set it's next pointer to the index-th node. 
// If index = -1, then the tail node points to null and no cycle exists.

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
     * @return {boolean}
     */
    hasCycle(head: ListNode | null): boolean {
        const objs = new Set<object>();
        
        let curr = head;
        while (curr !== null) {
            if (objs.has(curr)) {
                return true;
            }
            objs.add(curr);
            curr = curr.next;
        }
        return false;
    }
}
