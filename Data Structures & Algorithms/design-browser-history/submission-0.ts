// You have a browser of one tab where you start on the homepage and you can visit another url,
// get back in the history number of steps or move forward in the history number of steps.

// Implement the BrowserHistory class:

// BrowserHistory(string homepage) Initializes the object with the homepage of the browser.

// void visit(string url) Visits url from the current page. It clears up all the forward history.

// string back(int steps) Move steps back in history.
// If you can only return x steps in the history and steps > x, you will return only x steps.
// Return the current url after moving back in history at most steps.

// string forward(int steps) Move steps forward in history.
// If you can only forward x steps in the history and steps > x, you will forward only x steps.
// Return the current url after forwarding in history at most steps.

type BrowserNode = {
  val: string;
  prev: BrowserNode | null;
  next: BrowserNode | null;
};

class BrowserHistory {
  private head: BrowserNode | null;
  private curr: BrowserNode | null;

  /**
   * @constructor
   * @param {string} homepage
   */
  constructor(homepage: string) {
    this.head = { val: homepage, prev: null, next: null };
    this.curr = this.head;
  }

  /**
   * @param {string} url
   * @return {void}
   */
  visit(url: string) {
    const newCurr: BrowserNode = { val: url, prev: this.curr, next: null };
    this.curr!.next = newCurr;
    this.curr = newCurr;
  }

  /**
   * @param {number} steps
   * @return {string}
   */
  back(steps: number) {
    while (steps > 0 && this.curr!.prev) {
      this.curr = this.curr!.prev;
      steps--;
    }
    return this.curr!.val;
  }

  /**
   * @param {number} steps
   * @return {string}
   */
  forward(steps: number) {
    while (steps > 0 && this.curr!.next) {
      this.curr = this.curr!.next;
      steps--;
    }
    return this.curr!.val;
  }
}
