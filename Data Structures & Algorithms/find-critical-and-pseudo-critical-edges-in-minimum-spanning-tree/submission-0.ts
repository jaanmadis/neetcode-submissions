// You are given a weighted undirected connected graph with n vertices numbered from 0 to n - 1, and an array edges where edges[i] = [a[i], b[i], weight[i]] represents a bidirectional and weighted edge between nodes a[i] and b[i]. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.

// Find all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST). An MST edge whose deletion from the graph would cause the MST weight to increase is called a critical edge. On the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.

// Note that you can return the indices of the edges in any order.

class UnionFind {
  private parent: number[];

  constructor(n: number) {
    this.parent = Array(n);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  public find(x: number): number {
    if (this.parent[x] === x) {
      return x;
    }
    return this.find(this.parent[x]!);
  }

  public union(a: number, b: number): void {
    const parentA = this.find(a);
    const parentB = this.find(b);
    if (parentA !== parentB) {
      this.parent[parentB] = parentA;
    }
  }
}

class Solution {
  /**
   * @param {number} n
   * @param {number[][]} edges
   * @return {number[][]}
   */
  findCriticalAndPseudoCriticalEdges(n: number, edges: number[][]): number[][] {
    const minHeap: number[][] = [];
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]!;
      edge.push(i);
      minHeap.push(edge);
    }
    minHeap.sort((a, b) => b[2]! - a[2]!);

    const kruskal = (exclude: number, include: number): number => {
      const uf = new UnionFind(n);
      let mst = 0;
      let edgeCount = n - 1;
      let edgePtr = minHeap.length - 1;
      const edges = [];

      if (include >= 0) {
        const edge = minHeap[include]!;
        uf.union(edge[0]!, edge[1]!);
        mst += edge[2]!;
        edges.push(edge[3]!);
        edgeCount--;
      }

      while (edgePtr >= 0 && edgeCount > 0) {
        const edge = minHeap[edgePtr]!;
        if (edgePtr === exclude || edgePtr === include) {
          edgePtr--;
          continue;
        }
        const nodeA = edge[0]!;
        const nodeB = edge[1]!;
        const parentA = uf.find(nodeA);
        const parentB = uf.find(nodeB);
        if (parentA !== parentB) {
          uf.union(nodeA, nodeB);
          mst += edge[2]!;
          edges.push(edge[3]!);
          edgeCount--;
        }
        edgePtr--;
      }
      console.log(edges);
      return edgeCount === 0 ? mst : Infinity;
    };

    const critical: number[] = [];
    const nonCritical: number[] = [];

    const baseline = kruskal(-1, -1);
    for (let i = 0; i < minHeap.length; i++) {
      const edge = minHeap[i]!;
      const withoutEdge = kruskal(i, -1);
      if (withoutEdge > baseline) {
        critical.push(edge[3]!);
        continue;
      }
      const withEdge = kruskal(-1, i);
      if (withEdge === baseline) {
        nonCritical.push(edge[3]!);
      }
    }

    return [critical, nonCritical];
  }
}

new Solution().findCriticalAndPseudoCriticalEdges(4, [
  [0, 3, 2],
  [0, 2, 5],
  [1, 2, 4],
]);

new Solution().findCriticalAndPseudoCriticalEdges(5, [
  [0, 3, 2],
  [0, 4, 2],
  [1, 3, 2],
  [3, 4, 2],
  [2, 3, 1],
  [1, 2, 3],
  [0, 1, 1],
]);
