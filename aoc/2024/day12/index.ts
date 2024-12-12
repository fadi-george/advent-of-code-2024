import { DIRS } from "../../constants";

export default (input: string) => {
  const grid = input.split("\n");
  const plots = getPlotInfo(grid);
  console.table(grid);
  console.log(plots);
  return {
    part1: getPrice(plots, false),
    part2: getPrice(plots, true),
  };
};

type PlotInfo = Record<string, { area: number; perimeter: number; sides: number }[]>;

const getPlotInfo = (grid: string[]) => {
  const visited = new Set<string>();

  const plots: PlotInfo = {};
  const cornerCounts: Record<string, number> = {};

  const flood = (ch: string, r: number, c: number, blockIndex: number) => {
    if (visited.has(`${r},${c}`)) return;
    visited.add(`${r},${c}`);
    plots[ch][blockIndex].area++;
    plots[ch][blockIndex].perimeter += 4;

    // check corner sides
    [
      [
        [r, c - 1],
        [r - 1, c],
        [r - 1, c - 1],
      ], // tl corner
      [
        [r, c + 1],
        [r - 1, c],
        [r - 1, c + 1],
      ], // tr corner
      [
        [r, c - 1],
        [r + 1, c],
        [r + 1, c - 1],
      ], // bl corner
      [
        [r, c + 1],
        [r + 1, c],
        [r + 1, c + 1],
      ], // br corner
    ].forEach(([[r1, c1], [r2, c2], [r3, c3]]) => {
      const side1 = grid[r1]?.[c1];
      const side2 = grid[r2]?.[c2];
      const diag = grid[r3]?.[c3];

      if (diag === ch && side1 !== ch && side2 !== ch) {
        if (!cornerCounts[`${ch},${blockIndex}`]) cornerCounts[`${ch},${blockIndex}`] = 0;
        cornerCounts[`${ch},${blockIndex}`] += 1;
      } else if (side1 !== ch && side2 !== ch) {
        plots[ch][blockIndex].sides++;
      }
      // let count = 1;

      // const ch1 = grid[r1]?.[c1];
      // const ch2 = grid[r2]?.[c2];
      // const ch3 = grid[r3]?.[c3];
      // const count = [ch1, ch2, ch3].reduce((a, gCh) => (ch === gCh ? a + 1 : a), 0) + 1;

      // if (count % 2 === 1) {
      //   if (count === 3) {
      //     if (!cornerCounts[`${ch},${blockIndex}`])
      //       cornerCounts[`${ch},${blockIndex}`] = 0;
      //     cornerCounts[`${ch},${blockIndex}`] += 1;
      //   } else {
      //     plots[ch][blockIndex].sides++;
      //   }
      // }
    });

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
        plots[ch].push({ area: 0, perimeter: 0, sides: 0 });

        const blockIndex = plots[ch].length - 1;
        flood(ch, i, j, blockIndex);
        plots[ch][blockIndex].sides += (cornerCounts[`${ch},${blockIndex}`] ?? 0) / 3;
      }
    }
  }

  return plots;
};

const getPrice = (plots: PlotInfo, useSides: boolean) => {
  return Object.entries(plots).reduce((acc, [ch, blocks]) => {
    return (
      acc +
      blocks.reduce((acc, { area, perimeter, sides }) => {
        return acc + (useSides ? sides : perimeter) * area;
      }, 0)
    );
  }, 0);
};

// 1378316 too high
1375574;
