// Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
// A node in a singly linked list should have two attributes: val and next.
// val is the value of the current node, and next is a pointer/reference to the next node.
// If you want to use the doubly linked list, you will need one more attribute prev to indicate the previous node in the linked list.
// Assume all nodes in the linked list are 0-indexed.

// Implement the MyLinkedList class:

// MyLinkedList() Initializes the MyLinkedList object.

// int get(int index) Get the value of the index-th node in the linked list. If the index is invalid, return -1.

// void addAtHead(int val) Add a node of value val before the first element of the linked list.
// After the insertion, the new node will be the first node of the linked list.

// void addAtTail(int val) Append a node of value val as the last element of the linked list.

// void addAtIndex(int index, int val) Add a node of value val before the index-th node in the linked list.
// If index equals the length of the linked list, the node will be appended to the end of the linked list.
// If index is greater than the length, the node will not be inserted.

// void deleteAtIndex(int index) Delete the index-th node in the linked list, if the index is valid.

type Node = {
  val: number;
  next: Node | null;
};

class MyLinkedList {
  private head: Node | null = null;
  private tail: Node | null = null;
  private length: number = 0;

  constructor() {}

  private getNode(index: number): Node | null {
    let curr = this.head;
    let currIndex = 0;
    while (curr !== null) {
      if (index === currIndex) {
        return curr;
      }
      curr = curr.next;
      currIndex++;
    }
    return null;
  }

  /**
   * @param {number} index
   * @return {number}
   */
  get(index: number): number {
    return this.getNode(index)?.val ?? -1;
  }

  /**
   * @param {number} val
   * @return {void}
   */
  addAtHead(val: number): void {
    const newNode: Node = { val, next: null };
    if (this.head) {
      newNode.next = this.head;
    }
    this.head = newNode;
    if (this.length === 0) {
      this.tail = this.head;
    }
    this.length++;
  }

  /**
   * @param {number} val
   * @return {void}
   */
  addAtTail(val: number): void {
    const newNode: Node = { val, next: null };
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    if (this.length === 0) {
      this.head = this.tail;
    }
    this.length++;
  }

  /**
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  addAtIndex(index: number, val: number): void {
    if (index < 0 || index > this.length) {
      return;
    }

    if (index === 0) {
      this.addAtHead(val);
    } else if (index === this.length) {
      this.addAtTail(val);
    } else if (index < this.length) {
      const newNode: Node = { val, next: null };
      const found = this.getNode(index - 1);
      if (found) {
        const foundNext = found.next;
        found.next = newNode;
        newNode.next = foundNext;
      }
      this.length++;
    }
  }

  /**
   * @param {number} index
   * @return {void}
   */
  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.length) {
      return;
    }

    if (index === 0) {
      if (this.head) {
        this.head = this.head.next;
      }
      this.length--;
      if (this.length === 0) {
        this.tail = null;
      }
    } else {
      const prev = this.getNode(index - 1);
      const found = this.getNode(index);
      if (prev && found) {
        prev.next = found.next;
      }
      if (index === this.length - 1) {
        this.tail = prev;
      }
      this.length--;
    }
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
