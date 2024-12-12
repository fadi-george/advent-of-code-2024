import { DIRS } from "../../constants";

export default (input: string) => {
  const grid = input.split("\n");
  const plots = getPlotInfo(grid);
  const price = getPrice(plots);
  console.table(grid);
  console.table(plots);
  console.log(price);

  return {
    part1: price,
    part2: "",
  };
};

type PlotInfo = Record<string, { area: number; perimeter: number; blocks: number }>;

const getPlotInfo = (grid: string[]) => {
  const visited = new Set<string>();

  const plots: PlotInfo = {};

  const dfs = (ch: string, r: number, c: number, blocks: number) => {
    if (visited.has(`${r},${c}`)) return;
    visited.add(`${r},${c}`);
    plots[`${ch},${blocks}`].area++;

    plots[`${ch},${blocks}`].perimeter += 4;
    DIRS.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      const nCh = grid[nr]?.[nc];
      if (!nCh) return;
      if (nCh === ch) {
        plots[`${ch},${blocks}`].perimeter--;
        dfs(ch, nr, nc, blocks);
      }
    });
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const ch = grid[i][j];
      if (!plots[ch]) {
        plots[ch] = {
          area: 0,
          perimeter: 0,
          blocks: 1,
        };
        dfs(ch, i, j, 1);
      }
      const blocks = plots[ch].blocks;
      if (!visited.has(`${i},${j}`)) {
        plots[`${ch},${blocks}`].blocks++;
      }
    }
  }

  // while (q.length > 0) {
  //   const { ch, r, c, isNew } = q.shift()!;
  //   console.log({ ch, isNew });

  //   if (visited.has(`${r},${c}`)) continue;
  //   visited.add(`${r},${c}`);

  //   let neighbors = 0;

  //   DIRS.forEach(([dr, dc]) => {
  //     const nr = r + dr;
  //     const nc = c + dc;

  //     const nCh = grid[nr]?.[nc];
  //     if (!nCh) return;

  //     let isNewRegion = false;
  //     if (nCh === ch) {
  //       neighbors++;
  //     } else {
  //       isNewRegion = true;
  //     }
  //     q.push({ ch: nCh, r: nr, c: nc, isNew: isNewRegion });
  //   });
  //   const newArea = (plots[ch]?.area ?? 0) + 1;
  //   const newPerimeter = (plots[ch]?.perimeter ?? 0) + (4 - neighbors);
  //   const newBlocks = (plots[ch]?.blocks ?? 0) + Number(isNew);
  //   plots[ch] = { area: newArea, perimeter: newPerimeter, blocks: newBlocks };
  // }

  return plots;
};

const getPrice = (plots: PlotInfo) => {
  return Object.entries(plots).reduce((acc, [ch, { area, perimeter, blocks }]) => {
    return acc + area * perimeter * blocks;
  }, 0);
};
