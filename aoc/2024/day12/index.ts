import { DIRS } from "../../constants";

// prettier-ignore
const ALL_CORNERS = [1, -1].flatMap((x) => [1, -1].map((y) => [[0, -1], [-1, 0], [-1, -1]].map(([r, c]) => [r * x, c * y])));
type PlotInfo = { area: number; perimeter: number; sides: number };

export default (input: string) => {
  const [grid, visited] = [input.split("\n"), new Set<string>()];
  let [p1, p2] = [0, 0];

  const flood = (ch: string, r: number, c: number, info: PlotInfo) => {
    if (visited.has(`${r},${c}`)) return;
    visited.add(`${r},${c}`);
    info.area++;

    // corners will have an L shape or have no matching sides
    ALL_CORNERS.forEach((corner) => {
      const [s1, s2, d] = corner.map(([dr, dc]) => grid[r + dr]?.[c + dc]);
      if ((s1 !== ch && s2 !== ch) || (ch === s1 && ch === s2 && d !== ch)) info.sides++;
    });

    // go up, down, left, right checking for matching blocks
    for (const [dr, dc] of DIRS)
      grid[r + dr]?.[c + dc] === ch ? flood(ch, r + dr, c + dc, info) : info.perimeter++;
  };

  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[i].length; j++) {
      const info = { area: 0, perimeter: 0, sides: 0 };
      flood(grid[i][j], i, j, info);
      [p1, p2] = [p1 + info.area * info.perimeter, p2 + info.area * info.sides];
    }

  return { part1: p1, part2: p2 };
};
