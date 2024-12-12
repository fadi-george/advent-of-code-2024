import { DIRS } from "../../constants";

export default (input: string) => {
  const grid = input.split("\n");
  const plots = getPlotInfo(grid);

  return {
    part1: getPrice(plots, false),
    part2: getPrice(plots, true),
  };
};

// prettier-ignore
const CORNER_OFFSETS = [[0, -1], [-1, 0], [-1, -1]]; // left, top, diagonal
const ALL_CORNERS = [
  CORNER_OFFSETS, // top-left direction
  CORNER_OFFSETS.map(([r, c]) => [r, -c]), // top-right
  CORNER_OFFSETS.map(([r, c]) => [-r, c]), // bottom-left
  CORNER_OFFSETS.map(([r, c]) => [-r, -c]), // bottom-right
];
type PlotInfo = Record<string, { area: number; perimeter: number; sides: number }[]>;

const getPlotInfo = (grid: string[]) => {
  const visited = new Set<string>();

  const plots: PlotInfo = {};

  const flood = (ch: string, r: number, c: number, blockIndex: number) => {
    if (visited.has(`${r},${c}`)) return;
    visited.add(`${r},${c}`);
    plots[ch][blockIndex].area++;
    plots[ch][blockIndex].perimeter += 4;

    ALL_CORNERS.forEach(([[dr1, dc1], [dr2, dc2], [dr3, dc3]]) => {
      const side1 = grid[r + dr1]?.[c + dc1];
      const side2 = grid[r + dr2]?.[c + dc2];
      const diag = grid[r + dr3]?.[c + dc3];

      // no same neighbors in corner direction
      if (side1 !== ch && side2 !== ch) {
        plots[ch][blockIndex].sides++;
        // inverse corner where corner direction has three of the same character (L shape)
      } else if (ch === side1 && ch === side2 && diag !== ch) {
        plots[ch][blockIndex].sides++;
      }
    });

    DIRS.forEach(([dr, dc]) => {
      const [nr, nc] = [r + dr, c + dc];
      if (grid[nr]?.[nc] === ch) {
        plots[ch][blockIndex].perimeter--;
        flood(ch, nr, nc, blockIndex);
      }
    });
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const ch = grid[i][j];
      if (!plots[ch]) plots[ch] = [];
      if (!visited.has(`${i},${j}`)) {
        plots[ch].push({ area: 0, perimeter: 0, sides: 0 });

        const blockIndex = plots[ch].length - 1;
        flood(ch, i, j, blockIndex);
      }
    }
  }

  return plots;
};

const getPrice = (plots: PlotInfo, useSides: boolean) =>
  Object.values(plots)
    .flat()
    .reduce((sum, p) => sum + (useSides ? p.sides : p.perimeter) * p.area, 0);
