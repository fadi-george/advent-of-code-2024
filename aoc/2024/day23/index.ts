export default function solution(input: string) {
  const lines = input.split("\n");

  // const graph = new Map<string, string[]>();
  const connections: Record<string, Set<string>> = {};

  for (const line of lines) {
    const [a, b] = line.split("-");
    if (!connections[a]) connections[a] = new Set();
    if (!connections[b]) connections[b] = new Set();
    connections[a].add(b);
    connections[b].add(a);
  }

  // console.log(connections);
  getThreeConnected(connections);

  return { part1: getThreeConnected(connections), part2: "" };
}

type Connections = Record<string, Set<string>>;

const getThreeConnected = (connections: Connections) => {
  // const threeConnected = new Set<string>();
  // for (const [node, neighbors] of Object.entries(connections)) {
  //   if (neighbors.length === 3) {
  //     threeConnected.add(node);
  //   }
  // }
  // return threeConnected;
  // const results: string[][] = [];
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
