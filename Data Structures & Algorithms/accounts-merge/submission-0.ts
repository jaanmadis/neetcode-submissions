// Given a list of accounts where each element accounts[i] is a list of strings,
// where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.
// Now, we would like to merge these accounts.
// Two accounts definitely belong to the same person if there is some common email to both accounts.
// Note that even if two accounts have the same name, they may belong to different people as people could have the same name.
// A person can have any number of accounts initially, but all of their accounts definitely have the same name.
// After merging the accounts, return the accounts in the following format: the first element of each account is the name,
// and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

class UnionFind {
  private parents: number[];

  constructor(n: number) {
    this.parents = Array(n);
    for (let i = 0; i < this.parents.length; i++) {
      this.parents[i] = i;
    }
  }

  public find(x: number): number {
    if (this.parents[x] === x) {
      return x;
    }
    return this.find(this.parents[x]!);
  }

  public union(a: number, b: number) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) {
      this.parents[rb] = ra;
    }
  }
}

class Solution {
  /**
   * @param {string[][]} accounts
   * @return {string[][]}
   */
  accountsMerge(accounts: string[][]): string[][] {
    // Map emails to ids, so we can use these ids in union-find.
    const emailToId = new Map<string, number>();
    let id = 0;
    for (const account of accounts) {
      for (let i = 1; i < account.length; i++) {
        if (!emailToId.has(account[i]!)) {
          emailToId.set(account[i]!, id);
          id++;
        }
      }
    }

    // Create Union-Find and union all id-s that are on the same account.
    const uf = new UnionFind(id);

    for (const account of accounts) {
      const a = emailToId.get(account[1]!)!;
      for (let i = 2; i < account.length; i++) {
        const b = emailToId.get(account[i]!)!;
        uf.union(a, b);
      }
    }

    // Create new accounts, each root in union-find is an account.
    const newAccounts = new Map<number, string[]>();

    for (const account of accounts) {
      const accountName = account[0]!;
      for (let i = 1; i < account.length; i++) {
        const email = account[i]!;
        const emailId = emailToId.get(email);

        // If email is not found, then it was already added and we can skip it.
        if (emailId === undefined) {
          continue;
        }

        // Add email to new account.
        const root = uf.find(emailId);
        if (!newAccounts.has(root)) {
          newAccounts.set(root, [accountName]);
        }
        newAccounts.get(root)!.push(email);

        // Delete email from map, so we would not add it again if multiple old accounts had the same email.
        emailToId.delete(email);
      }
    }

    // Sort emails in new account aplhabetically (exclude the account name at the beginning).
    // Push them into result and return.
    const result: string[][] = [];
    for (const newAccount of newAccounts.values()) {
      const accountName = newAccount.shift()!;
      newAccount.sort();
      newAccount.unshift(accountName);
      result.push(newAccount);
    }

    return result;
  }
}

new Solution().accountsMerge([
  ["neet", "neet@gmail.com", "neet_dsa@gmail.com"],
  ["alice", "alice@gmail.com"],
  ["neet", "bob@gmail.com", "neet@gmail.com"],
  ["neet", "neetcode@gmail.com"],
]);
