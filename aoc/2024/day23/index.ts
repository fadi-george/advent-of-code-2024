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
  // Helper function to check if a new node can be added to existing group
  const canAddToGroup = (group: Set<string>, newNode: string): boolean => {
    for (const node of group) if (!connections[node].has(newNode)) return false;
    return true;
  };

  // e.g. kh, tc, qp ...
  const allComputers = Object.keys(connections);
  let maxGroup = new Set<string>();

  // Recursive function with backtracking
  const findGroup = (current: Set<string>, pos: number) => {
    if (current.size > maxGroup.size) maxGroup = new Set(current);

    // Try adding each remaining computer
    for (let i = pos; i < allComputers.length; i++) {
      const computer = allComputers[i];
      if (canAddToGroup(current, computer)) {
        current.add(computer);
        findGroup(current, i + 1);
        current.delete(computer);
      }
    }
  };

  findGroup(new Set(), 0);
  return [...maxGroup].sort().join(",");
};
