// Implement a simplified version of Twitter which allows users to post tweets,
// follow/unfollow each other,
// and view the 10 most recent tweets within their own news feed.

// Users and tweets are uniquely identified by their IDs (integers).

// Implement the following methods:

// Twitter() Initializes the twitter object.
// void postTweet(int userId, int tweetId) Publish a new tweet with ID tweetId by the user userId.
// You may assume that each tweetId is unique.

// List<Integer> getNewsFeed(int userId) Fetches at most the 10 most recent tweet IDs in the user's news feed.
// Each item must be posted by users who the user is following or by the user themself.
// Tweets IDs should be ordered from most recent to least recent.

// void follow(int followerId, int followeeId) The user with ID followerId follows the user with ID followeeId.
// void unfollow(int followerId, int followeeId) The user with ID followerId unfollows the user with ID followeeId.

type HeapNode = {
  value: number;
  tweetId: number;
  tweetIndex: number;
  userId: number;
};

interface IHeap {
  add(node: HeapNode): void;
  peek(): HeapNode | undefined;
  remove(): HeapNode | undefined;
  size(): number;
}

class CustomMaxHeap implements IHeap {
  private nodes: HeapNode[] = [];

  public add(node: HeapNode): void {
    this.nodes.push(node);

    // Heapify up: promote larger node to parent.
    let nodeIndex = this.nodes.length - 1;

    while (nodeIndex > 0) {
      // Get parent index.
      const parentIndex = Math.floor((nodeIndex - 1) / 2);
      // Is parent is larger?
      if (this.nodes[nodeIndex]!.value! > this.nodes[parentIndex]!.value!) {
        // Flip parent and child.
        const temp = this.nodes[parentIndex]!;
        this.nodes[parentIndex] = this.nodes[nodeIndex]!;
        this.nodes[nodeIndex]! = temp!;
        // Run the same logic with node's new position in the heap.
        nodeIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  public peek(): HeapNode | undefined {
    return this.nodes[0];
  }

  public remove(): HeapNode | undefined {
    if (this.nodes.length === 0) {
      return undefined;
    }

    // Get the head.
    const result = this.nodes[0];

    // Put last value as new head.
    // Unless heap only had 1 element.
    const last = this.nodes.pop()!;
    if (this.nodes.length > 0) {
      this.nodes[0] = last;
    }

    // Heapify down: promote larger child to parent.
    let nodeIndex = 0;
    while (nodeIndex < this.nodes.length) {
      // Get child indices.
      const leftChildIndex = nodeIndex * 2 + 1;
      const rightChildIndex = nodeIndex * 2 + 2;

      // There is no left child, stop.
      if (leftChildIndex >= this.nodes.length) {
        break;
      }

      // Assume left is larger...
      let largerChildIndex = leftChildIndex;

      // ...unless right is larger.
      if (
        rightChildIndex < this.nodes.length &&
        this.nodes[rightChildIndex]!.value! > this.nodes[leftChildIndex]!.value!
      ) {
        largerChildIndex = rightChildIndex;
      }

      // Parent is already larger than child, stop.
      if (
        this.nodes[nodeIndex]!.value! >= this.nodes[largerChildIndex]!.value!
      ) {
        break;
      }

      // Flip parent and larger child.
      const temp = this.nodes[nodeIndex]!;
      this.nodes[nodeIndex] = this.nodes[largerChildIndex]!;
      this.nodes[largerChildIndex] = temp;

      // Run the same logic with parent's new position in the heap.
      nodeIndex = largerChildIndex;
    }
    return result;
  }

  public size(): number {
    return this.nodes.length;
  }
}

type Tweet = {
  id: number;
  timestamp: number;
};

class Twitter {
  private tweets: Map<number, Tweet[]>;
  private follows: Map<number, Set<number>>;
  private globalCounter: number = 0;

  constructor() {
    this.tweets = new Map<number, Tweet[]>();
    this.follows = new Map<number, Set<number>>();
    this.globalCounter = 0;
  }

  /**
   * @param {number} userId
   * @param {number} tweetId
   * @return {void}
   */
  postTweet(userId: number, tweetId: number): void {
    // Maintain all tweets from a user in an array. Array is already sorted.
    let usersTweets: Tweet[];
    if (this.tweets.has(userId)) {
      usersTweets = this.tweets.get(userId)!;
    } else {
      usersTweets = [];
      this.tweets.set(userId, usersTweets);
    }
    // Add timestamp info into every post.
    usersTweets.push({ id: tweetId, timestamp: this.globalCounter++ });
  }

  /**
   * @param {number} userId
   * @return {number[]}
   */
  getNewsFeed(userId: number): number[] {
    const recentTweets: number[] = [];
    const heap = new CustomMaxHeap();

    // Get all followers + user himself
    const userIds = [userId];
    const followees = this.follows.get(userId);
    if (followees) {
      for (const followee of followees) {
        userIds.push(followee);
      }
    }

    // Post most recent tweet from followers + user into MaxHeap ordered by timestamps.
    for (const id of userIds) {
      const userTweets = this.tweets.get(id);
      if (userTweets) {
        const newestTweet = userTweets[userTweets.length - 1];
        if (newestTweet) {
          heap.add({
            value: newestTweet.timestamp,
            tweetId: newestTweet.id,
            userId: id,
            tweetIndex: userTweets.length - 1,
          });
        }
      }
    }

    // While we don't have 10 tweets, remove most recent tweet from MaxHeap and add it to result.
    // Add the next most recent tweet from that user into MaxHeap.

    while (recentTweets.length < 10) {
      const currNode = heap.remove();
      if (!currNode) {
        break;
      }
      recentTweets.push(currNode.tweetId);

      const userTweets = this.tweets.get(currNode.userId);
      if (userTweets && currNode.tweetIndex > 0) {
        const nextTweet = userTweets[currNode.tweetIndex - 1]!;
        heap.add({
          value: nextTweet.timestamp,
          tweetId: nextTweet.id,
          tweetIndex: currNode.tweetIndex - 1,
          userId: currNode.userId,
        });
      }
    }

    return recentTweets;
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  follow(followerId: number, followeeId: number): void {
    let followees: Set<number>;
    if (this.follows.has(followerId)) {
      followees = this.follows.get(followerId)!;
    } else {
      followees = new Set<number>();
      this.follows.set(followerId, followees);
    }
    followees.add(followeeId);
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  unfollow(followerId: number, followeeId: number): void {
    if (this.follows.has(followerId)) {
      const followees = this.follows.get(followerId)!;
      followees.delete(followeeId);
    }
  }
}

const tw = new Twitter();
tw.postTweet(1, 10);
tw.postTweet(2, 20);
tw.getNewsFeed(1);
tw.getNewsFeed(2);
tw.follow(1, 2);
tw.getNewsFeed(1);
tw.getNewsFeed(2);
tw.unfollow(1, 2);
tw.getNewsFeed(1);
