import { MinPriorityQueue } from "@datastructures-js/priority-queue";

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

  const { lan, count } = getThreeConnected(connections);
  console.log("1");
  const password = getPassword(connections, network);
  console.log("2");
  return { part1: count, part2: password };
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

  return { lan: results, count: histArr.length };
};

// const buildLanParty = (connections: Connections, n: number) => {
//   const results = new Set<string>();
//   for (const [node, neighbors] of Object.entries(connections)) {
//     for (const neighbor of neighbors) {
//       const neighborNodes = connections[neighbor];
//       const intersection = neighborNodes.intersection(neighbors);
//       console.log(node, neighbor, intersection);
//     }
//   }

//   return results;
// };

type Info = {
  comps: string[];
  group: Set<string>;
};
const getPassword = (connections: Connections, network: [string, string][]) => {
  let res = "";
  // Helper function to check if a group of computers are all connected to each other
  const isCompleteGroup = (comps: string[]) => {
    for (let i = 0; i < comps.length; i++) {
      for (let j = i + 1; j < comps.length; j++) {
        if (!connections[comps[i]].has(comps[j])) {
          return false;
        }
      }
    }
    return true;
  };

  // Get all unique computers
  const allComputers = [...new Set(network.flat())];

  // Start with the largest possible group size and work down
  for (let size = allComputers.length; size >= 1; size--) {
    // Generate combinations of computers of the current size
    const queue = [[[], allComputers, 0]];

    while (queue.length > 0) {
      const [current, remaining, start] = queue.shift()!;

      if (current.length === size) {
        if (isCompleteGroup(current)) {
          // Found the largest complete group
          res = current.sort().join(",");
          break;
        }
        continue;
      }

      for (let i = start; i < remaining.length; i++) {
        const newCurrent = [...current, remaining[i]];
        // Early pruning: check if the current group is still valid
        if (isCompleteGroup(newCurrent)) {
          queue.push([newCurrent, remaining, i + 1]);
        }
      }
    }
    if (res) break;
  }

  console.log("res", res);

  return res;
};
