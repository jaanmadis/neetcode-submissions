// You are given a 2-D integer array points, where points[i] = [xi, yi]. Each points[i] represents a distinct point on a 2-D plane.

// The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between the two points, i.e. |xi - xj| + |yi - yj|.

// Return the minimum cost to connect all points together, such that there exists exactly one path between each pair of points.

type MinHeapValue = {
  node: GraphNode;
  val: number;
};

interface IHeap {
  add(value: MinHeapValue): void;
  peek(): MinHeapValue | undefined;
  remove(): MinHeapValue | undefined;
  size(): number;
}

class MinHeap implements IHeap {
  private nodes: MinHeapValue[] = [];

  public add(value: MinHeapValue): void {
    this.nodes.push(value);

    // Heapify up, promote new node to parent.
    let nodeIndex = this.nodes.length - 1;
    while (nodeIndex > 0) {
      // Get parent index.
      const parentIndex = Math.floor((nodeIndex - 1) / 2);
      // Is parent is smaller.
      if (this.nodes[nodeIndex]!.val < this.nodes[parentIndex]!.val) {
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

  public peek(): MinHeapValue | undefined {
    return this.nodes[0];
  }

  public remove(): MinHeapValue | undefined {
    if (this.nodes.length === 0) {
      return undefined;
    }

    // Pop the head.
    const result = this.nodes[0];

    // Put last value as new head.
    // Unless heap only had 1 element.
    const last = this.nodes.pop()!;
    if (this.nodes.length > 0) {
      this.nodes[0] = last;
    }

    // Heapify down, promote one child to parent.
    let nodeIndex = 0;
    while (nodeIndex < this.nodes.length) {
      // Get child indices.
      const leftChildIndex = nodeIndex * 2 + 1;
      const rightChildIndex = nodeIndex * 2 + 2;

      // There is no left child, stop.
      if (leftChildIndex >= this.nodes.length) {
        break;
      }

      // Assume left is smaller...
      let smallerChildIndex = leftChildIndex;

      // ...unless right is smaller.
      if (
        rightChildIndex < this.nodes.length &&
        this.nodes[rightChildIndex]!.val < this.nodes[leftChildIndex]!.val
      ) {
        smallerChildIndex = rightChildIndex;
      }

      // Parent is already smaller than child, stop.
      if (this.nodes[nodeIndex]!.val <= this.nodes[smallerChildIndex]!.val) {
        break;
      }

      // Flip parent and smaller child.
      const temp = this.nodes[nodeIndex]!;
      this.nodes[nodeIndex] = this.nodes[smallerChildIndex]!;
      this.nodes[smallerChildIndex] = temp;

      // Run the same logic with parent's new position in the heap.
      nodeIndex = smallerChildIndex;
    }
    return result;
  }

  public size(): number {
    return this.nodes.length;
  }
}

type GraphEdge = {
  to: GraphNode;
  val: number;
};

type GraphNode = {
  edges: GraphEdge[];
  x: number;
  y: number;
};

class Solution {
  /**
   * @param {number[][]} points
   * @return {number}
   */
  minCostConnectPoints(points: number[][]): number {
    const nodes = new Map<string, GraphNode>();
    for (const point of points) {
      const key = `${point[0]}-${point[1]}`;
      nodes.set(key, { edges: [], x: point[0]!, y: point[1]! });
    }
    for (let i = 0; i < points.length; i++) {
      const pointA = points[i]!;
      const keyA = `${pointA[0]}-${pointA[1]}`;
      const nodeA = nodes.get(keyA)!;
      for (let j = i + 1; j < points.length; j++) {
        const pointB = points[j]!;
        const keyB = `${pointB[0]}-${pointB[1]}`;
        const nodeB = nodes.get(keyB)!;
        const edgeVal =
          Math.abs(nodeB.x - nodeA.x) + Math.abs(nodeB.y - nodeA.y);
        nodeA.edges.push({
          to: nodeB,
          val: edgeVal,
        });
        nodeB.edges.push({
          to: nodeA,
          val: edgeVal,
        });
      }
    }
    // for (const [key, value] of nodes) {
    //   console.log(`(${value.x}-${value.y})`);
    //   value.edges.forEach((edge) => {
    //     console.log(`to (${edge.to.x}-${edge.to.y}) is ${edge.val}`);
    //   });
    // }
    const minHeap = new MinHeap();
    const startNode = nodes.get(`${points[0]![0]!}-${points[0]![1]!}`)!;
    startNode.edges.forEach((edge) =>
      minHeap.add({ node: edge.to, val: edge.val }),
    );
    const visited = new Set<GraphNode>();
    visited.add(startNode);
    let result = 0;
    while (minHeap.size() > 0) {
      const curr = minHeap.remove()!;
      if (visited.has(curr.node)) {
        continue;
      }
      visited.add(curr.node);
      result += curr.val;
      for (const edge of curr.node.edges) {
        if (!visited.has(edge.to)) {
          minHeap.add({ node: edge.to, val: edge.val });
        }
      }
    }
    return result;
  }
}

new Solution().minCostConnectPoints([
  [0, 0],
  [2, 2],
  [3, 3],
  [2, 4],
  [4, 2],
]);
