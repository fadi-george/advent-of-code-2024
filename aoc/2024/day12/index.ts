import { DIRS } from "../../constants";

// prettier-ignore
const CORNER_OFFSETS = [[0, -1], [-1, 0], [-1, -1]]; // left, top, diagonal
const ALL_CORNERS = [
  CORNER_OFFSETS, // top-left direction
  CORNER_OFFSETS.map(([r, c]) => [r, -c]), // top-right
  CORNER_OFFSETS.map(([r, c]) => [-r, c]), // bottom-left
  CORNER_OFFSETS.map(([r, c]) => [-r, -c]), // bottom-right
];
type PlotInfo = { area: number; perimeter: number; sides: number };

export default (input: string) => {
  const grid = input.split("\n");

  const visited = new Set<string>();
  let [p1, p2] = [0, 0];

  const flood = (ch: string, r: number, c: number, info: PlotInfo) => {
    if (visited.has(`${r},${c}`)) return;
    visited.add(`${r},${c}`);
    info.area++;

    ALL_CORNERS.forEach(([[dr1, dc1], [dr2, dc2], [dr3, dc3]]) => {
      const side1 = grid[r + dr1]?.[c + dc1];
      const side2 = grid[r + dr2]?.[c + dc2];
      const diag = grid[r + dr3]?.[c + dc3];

      // count L shape corner or regular corner
      if (side1 !== ch && side2 !== ch) info.sides++;
      else if (ch === side1 && ch === side2 && diag !== ch) info.sides++;
    });

    DIRS.forEach(([dr, dc]) => {
      const [nr, nc] = [r + dr, c + dc];
      grid[nr]?.[nc] === ch ? flood(ch, nr, nc, info) : info.perimeter++;
    });
  };

  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[i].length; j++)
      if (!visited.has(`${i},${j}`)) {
        const info = { area: 0, perimeter: 0, sides: 0 };
        flood(grid[i][j], i, j, info);
        p1 += info.area * info.perimeter;
        p2 += info.area * info.sides;
      }

  return {
    part1: p1,
    part2: p2,
  };
};
