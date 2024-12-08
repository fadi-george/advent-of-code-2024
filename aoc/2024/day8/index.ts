import { get1DIndex } from "../../lib/array";

export default (input: string) => {
  const grid = input.split("\n").map((line) => line);
  const w = grid[0].length;
  const h = grid.length;

  const antennas: Record<string, [number, number][]> = {};
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const c = grid[i][j];
      if (c === "." || c === "#") continue;
      if (!antennas[c]) antennas[c] = [];
      antennas[c].push([i, j]);
    }
  }

  const getImpact = (isCapped: boolean) => {
    const visited: Set<string> = new Set();
    Object.keys(antennas).forEach((a) => {
      const ps = antennas[a];
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const [x1, y1] = ps[i];
          const [x2, y2] = ps[j];
          const dx = x2 - x1;
          const dy = y2 - y1;

          let p1 = [x1 - dx, y1 - dy];
          let p2 = [x2 + dx, y2 + dy];

          if (!isCapped) {
            visited.add(`${x1},${y1}`);
            visited.add(`${x2},${y2}`);
          }

          while (grid[p1[0]]?.[p1[1]] !== undefined) {
            visited.add(`${p1[0]},${p1[1]}`);
            p1 = [p1[0] - dx, p1[1] - dy];
            if (isCapped) break;
          }
          while (grid[p2[0]]?.[p2[1]] !== undefined) {
            visited.add(`${p2[0]},${p2[1]}`);
            p2 = [p2[0] + dx, p2[1] + dy];
            if (isCapped) break;
          }
        }
      }
    });
    return visited.size;
  };

  return {
    part1: getImpact(true),
    part2: getImpact(false),
  };
};
