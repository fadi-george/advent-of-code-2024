import { PriorityQueue } from "@datastructures-js/priority-queue";

export default function solution(input: string) {
  const lines = input.split("\n");
  const connections: Record<string, Set<string>> = {};

  for (const line of lines) {
    const [a, b] = line.split("-");
    (connections[a] ??= new Set()).add(b);
    (connections[b] ??= new Set()).add(a);
  }

  return { part1: getThreeConnected(connections), part2: getPassword(connections) };
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

  // Pre-compute valid next nodes for each node
  const nextNodes = new Map<string, string[]>();
  for (const key of keys) {
    const val = keys.filter((k) => k > key && connections[key].has(k));
    nextNodes.set(key, val);
  }

  const q = new PriorityQueue<string[]>((a, b) => b.length - a.length);
  for (const key of keys) q.enqueue([key]);

  while (q.size() > 0) {
    const current = q.dequeue()!;
    if (current.length === maxLen) return current.join(",");

    const lastKey = current[current.length - 1];
    const possibleNext = nextNodes.get(lastKey)!;

    for (const key of possibleNext) {
      const con = connections[key];
      // check if all computers connected
      if (current.every((c) => con.has(c))) q.enqueue([...current, key]);
    }
  }
  return null;
};
