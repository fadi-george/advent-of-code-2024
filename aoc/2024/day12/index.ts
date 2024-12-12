import { DIRS } from "../../constants";

export default (input: string) => {
  const grid = input.split("\n");
  const plots = getPlotInfo(grid);
  console.log(plots);
  const price = getPrice(plots);

  return {
    part1: price,
    part2: "",
  };
};

type PlotInfo = Record<string, { area: number; perimeter: number }[]>;

const getPlotInfo = (grid: string[]) => {
  const visited = new Set<string>();

  const plots: PlotInfo = {};

  const flood = (ch: string, r: number, c: number, blockIndex: number) => {
    if (visited.has(`${r},${c}`)) return;
    visited.add(`${r},${c}`);
    plots[ch][blockIndex].area++;
    plots[ch][blockIndex].perimeter += 4;

    DIRS.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      const nCh = grid[nr]?.[nc];
      if (!nCh) return;
      if (nCh === ch) {
        plots[ch][blockIndex].perimeter--;
        flood(ch, nr, nc, blockIndex);
      }
    });
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const ch = grid[i][j];
      if (!plots[ch]) {
        plots[ch] = [];
      }
      if (!visited.has(`${i},${j}`)) {
        plots[ch].push({ area: 0, perimeter: 0 });
        flood(ch, i, j, plots[ch].length - 1);
      }
    }
  }

  return plots;
};

const getPrice = (plots: PlotInfo) => {
  return Object.entries(plots).reduce((acc, [ch, blocks]) => {
    return (
      acc +
      blocks.reduce((acc, { area, perimeter }) => {
        return acc + area * perimeter;
      }, 0)
    );
  }, 0);
};

// 1378316 too high
