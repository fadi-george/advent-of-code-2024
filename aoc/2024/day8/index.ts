import { get1DIndex } from "../../lib/array";

export default (input: string) => {
  const grid = input.split("\n").map((line) => line);
  const w = grid[0].length;
  const h = grid.length;

  const antennas: Record<string, [number, number][]> = {};
  console.table(grid);
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const c = grid[i][j];
      if (c === ".") continue;
      antennas[c] = antennas[c] || [];
      antennas[c].push([i, j]);
    }
  }

  let visited: Set<string> = new Set();

  console.log(antennas);
  // const fills: Record<string, [number, number][]> = {};
  Object.keys(antennas).forEach((a) => {
    const ps = antennas[a];
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const [x1, y1] = ps[i];
        const [x2, y2] = ps[j];
        // console.log({ x1, y1, x2, y2 });
        const dx = x2 - x1;
        const dy = y2 - y1;

        const p1 = [x1 - dx, y1 - dy];
        const p2 = [x2 + dx, y2 + dy];
        // console.log({ dx, dy, p1, p2 });
        if (grid[p1[0]]?.[p1[1]] !== undefined) {
          // console.log(p1, get1DIndex(p1[0], p1[1], w));
          visited.add(`${p1[0]},${p1[1]}`);
          // visited.add(get1DIndex(p1[0], p1[1], w));
          // grid[p1[0]] =
        }
        if (grid[p2[0]]?.[p2[1]] !== undefined) {
          // console.log(p2, get1DIndex(p2[0], p2[1], w));
          // visited.add(get1DIndex(p2[0], p2[1], w));
          visited.add(`${p2[0]},${p2[1]}`);
        }
        // const idx = get1DIndex(w, x1 + dx, y1 + dy);
        // visited.add(idx);
        // fills[a] = fills[a] || [];

        // fills[a].push([x1 + dx, y1 + dy]);
        // fills[a].push([x1 - dx, y1 - dy]);
      }
    }
  });

  // console.log(fills);
  // console.log(visited);
  // console.log(visited.size);

  let p1 = 0;
  let p2 = 0;
  return { part1: visited.size, part2: p2 };
};
