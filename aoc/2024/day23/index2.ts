// alternative using Bron-Kerbosch algorithm
export default function solution(input: string) {
  const lines = input.split("\n");

  const connections: Record<string, Set<string>> = {};

  for (const line of lines) {
    const [a, b] = line.split("-");
    (connections[a] ??= new Set()).add(b);
    (connections[b] ??= new Set()).add(a);
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
  let maxClique: string[] = [];

  const bronKerbosch = (
    clique: string[], // R: current clique being built
    candidates: string[], // P: potential vertices to add to clique
    excluded: string[] // X: vertices already processed/excluded
  ) => {
    if (candidates.length === 0 && excluded.length === 0) {
      if (clique.length > maxClique.length) maxClique = clique.slice();
      return;
    }

    for (let vertex of candidates) {
      let newClique = clique.concat(vertex);
      let newCandidates = candidates.filter((u) => connections[vertex].has(u));
      let newExcluded = excluded.filter((u) => connections[vertex].has(u));
      bronKerbosch(newClique, newCandidates, newExcluded);
      candidates.splice(candidates.indexOf(vertex), 1);
      excluded.push(vertex);
    }
  };

  bronKerbosch([], Object.keys(connections), []);
  return maxClique.sort().join(",");
};
