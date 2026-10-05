// Implement the Least Recently Used (LRU) cache class LRUCache.
// The class should support the following operations

// LRUCache(int capacity) Initialize the LRU cache of size capacity.
// int get(int key) Return the value corresponding to the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists.
// Otherwise, add the key-value pair to the cache.
// If the introduction of the new pair causes the cache to exceed its capacity, remove the least recently used key.
// A key is considered used if a get or a put operation is called on it.

// Ensure that get and put each run in
// O(1) average time complexity.

type LRUItem = {
  key: number;
  value: number;
  next: LRUItem | null;
  prev: LRUItem | null;
};

class LRUCache {
  /**
   * @param {number} capacity
   */
  private map: Map<number, LRUItem>;
  private capacity: number = 0;
  private LRUHead: LRUItem | null;
  private MRUTail: LRUItem | null;

  constructor(capacity: number) {
    this.map = new Map();
    this.capacity = capacity;
    this.LRUHead = null;
    this.MRUTail = null;
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key: number): number {
    const item = this.map.get(key);

    if (!item) {
      return -1;
    }

    this.moveToMRU(item);

    return item.value;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key: number, value: number): void {
    let item = this.map.get(key);

    if (item) {
      // Existing key: update its value.
      item.value = value;

      // put() counts as using the key.
      this.moveToMRU(item);

      return;
    }

    // New key. Evict LRU if we're at capacity.
    if (this.map.size === this.capacity) {
      this.removeLRU();
    }

    item = {
      key,
      value,
      next: null,
      prev: null,
    };

    this.map.set(key, item);

    // Add new item as MRU.
    if (!this.LRUHead) {
      this.LRUHead = item;
      this.MRUTail = item;
    } else {
      item.prev = this.MRUTail;
      this.MRUTail!.next = item;
      this.MRUTail = item;
    }
  }

  private moveToMRU(item: LRUItem): void {
    // Already MRU. Nothing to do.
    if (item === this.MRUTail) {
      return;
    }

    // Remove item from its current position.

    if (item.prev) {
      item.prev.next = item.next;
    } else {
      // Item is the head.
      this.LRUHead = item.next;
    }

    if (item.next) {
      item.next.prev = item.prev;
    }

    // Add item to the tail.
    item.prev = this.MRUTail;
    item.next = null;

    if (this.MRUTail) {
      this.MRUTail.next = item;
    }

    this.MRUTail = item;

    // Needed if the list was somehow empty before adding.
    if (!this.LRUHead) {
      this.LRUHead = item;
    }
  }

  private removeLRU(): void {
    if (!this.LRUHead) {
      return;
    }

    const item = this.LRUHead;

    this.map.delete(item.key);

    this.LRUHead = item.next;

    if (this.LRUHead) {
      this.LRUHead.prev = null;
    } else {
      // The list became empty.
      this.MRUTail = null;
    }

    item.next = null;
    item.prev = null;
  }
}
