// Design a time-based key-value data structure that can store multiple values for the same key at different
// time stamps and retrieve the key's value at a certain timestamp.

// Implement the TimeMap class:

// TimeMap() Initializes the object of the data structure.
// void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
// String get(String key, int timestamp)
// Returns a value such that set was called previously, with timestamp_prev <= timestamp.
// If there are multiple such values, it returns the value associated with the largest timestamp_prev.
// If there are no values, it returns "".

// All the timestamps of set are strictly increasing.

type ValueWithTime = {
  value: string;
  timestamp: number;
};

class TimeMap {
  keyStore: Map<string, ValueWithTime[]>;

  constructor() {
    this.keyStore = new Map();
  }

  /**
   * @param {string} key
   * @param {string} value
   * @param {number} timestamp
   * @return {void}
   */

  // Use map, store arrays of records of value + timestamp
  // All the timestamps of set are strictly increasing, so we can just push values in and timestamps will be ordered.
  set(key: string, value: string, timestamp: number): void {
    const newValue: ValueWithTime = {
      value,
      timestamp,
    };
    if (!this.keyStore.has(key)) {
      this.keyStore.set(key, [newValue]);
    } else {
      this.keyStore.get(key)?.push(newValue);
    }
  }

  /**
   * @param {string} key
   * @param {number} timestamp
   * @return {string}
   */

  // Find the array of records from map.
  // Then binary search in the array, look for the largest prevTime that is smaller or equal to timestamp.
  get(key: string, timestamp: number): string {
    if (!this.keyStore.has(key)) {
      return "";
    }
    const values: ValueWithTime[] = this.keyStore.get(key)!;
    let left = 0;
    let right = values.length - 1;
    let best = "";
    while (left <= right) {
      const curr = left + Math.floor((right - left) / 2);
      const prevTime = values[curr]!.timestamp;
      if (prevTime === timestamp) {
        return values[curr]!.value;
      } else if (prevTime > timestamp) {
        right = curr - 1;
      } else if (prevTime < timestamp) {
        best = values[curr]!.value;
        left = curr + 1;
      }
    }
    return best;
  }
}

const timeMap = new TimeMap();
timeMap.set("alice", "happy", 1);
timeMap.get("alice", 1);
timeMap.get("alice", 2);
timeMap.set("alice", "sad", 3);
timeMap.get("alice", 3);
