import { DIRS } from "../../constants";

// prettier-ignore
const CORNER_OFFSETS = [[0, -1], [-1, 0], [-1, -1]]; // left, top, diagonal
const ALL_CORNERS = [1, -1].flatMap((x) =>
  [1, -1].map((y) => CORNER_OFFSETS.map(([r, c]) => [r * x, c * y]))
);
type PlotInfo = { area: number; perimeter: number; sides: number };

export default (input: string) => {
  const [grid, visited] = [input.split("\n"), new Set<string>()];
  let [p1, p2] = [0, 0];

  const flood = (ch: string, r: number, c: number, info: PlotInfo) => {
    if (visited.has(`${r},${c}`)) return;
    visited.add(`${r},${c}`);
    info.area++;

    // check sides and diagonal for each corner
    ALL_CORNERS.forEach(([[dr1, dc1], [dr2, dc2], [dr3, dc3]]) => {
      const [s1, s2, d] = [
        grid[r + dr1]?.[c + dc1],
        grid[r + dr2]?.[c + dc2],
        grid[r + dr3]?.[c + dc3],
      ];
      if ((s1 !== ch && s2 !== ch) || (ch === s1 && ch === s2 && d !== ch)) info.sides++;
    });

    DIRS.forEach(([dr, dc]) => {
      const [nr, nc] = [r + dr, c + dc]; // check matching blocks
      grid[nr]?.[nc] === ch ? flood(ch, nr, nc, info) : info.perimeter++;
    });
  };

  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[i].length; j++) {
      const info = { area: 0, perimeter: 0, sides: 0 };
      flood(grid[i][j], i, j, info);
      [p1, p2] = [p1 + info.area * info.perimeter, p2 + info.area * info.sides];
    }

  return { part1: p1, part2: p2 };
};
