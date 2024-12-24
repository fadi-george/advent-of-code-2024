import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

export default function solution(input: string) {
  const lines = input.split("\n");

  // const graph = new Map<string, string[]>();
  const connections: Record<string, Set<string>> = {};
  const network: [string, string][] = [];

  for (const line of lines) {
    const [a, b] = line.split("-");
    network.push([a, b]);
    if (!connections[a]) connections[a] = new Set();
    if (!connections[b]) connections[b] = new Set();
    connections[a].add(b);
    connections[b].add(a);
  }

  return {
    part1: getThreeConnected(connections),
    part2: getPassword(connections),
  };
}

type Connections = Record<string, Set<string>>;

const getThreeConnected = (connections: Connections) => {
  const results = new Set<string>();
  for (const [node, neighbors] of Object.entries(connections)) {
    for (const neighbor of neighbors) {
      const neighborNodes = connections[neighbor];
      const intersection = neighborNodes.intersection(neighbors);
      if (intersection.size >= 1) {
        [...intersection].forEach((n) => {
          results.add([node, neighbor, n].sort().join(","));
        });
      }
    }
  }

  // find one that have a node that starts with "t"
  const histArr = [...results].filter((r) => r.split(",").some((n) => n.startsWith("t")));

  return histArr.length;
};

const getPassword = (connections: Connections) => {
  const maxLen = Math.max(...Object.values(connections).map((v) => v.size));
  const keys = Object.keys(connections).sort();

  const q = new MaxPriorityQueue<string[]>((v) => v.length);
  for (const key of keys) q.enqueue([key]);

  while (q.size() > 0) {
    const current = q.dequeue()!;

    for (const key of keys) {
      // since we will return a sorted list already, can skip if the last key is greater than the current key
      const lastKey = current[current.length - 1];
      if (lastKey >= key) continue;

      const con = connections[key];

      // all computers connected
      if (current.every((c) => con.has(c))) q.enqueue([...current, key]);
      else if (current.length === maxLen) return current.join(",");
    }
  }
  return null;
};
