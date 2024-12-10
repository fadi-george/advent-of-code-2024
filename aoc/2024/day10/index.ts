export default (input: string) => {
  const grid = input.split("\n");

  // find all 0s
  const startPos = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "0") {
        startPos.push([r, c]);
      }
    }
  }

  // const sr = grid.findIndex((row) => row.includes("0"));
  // const sc = grid[sr].indexOf("0");
  // console.table(grid);
  // console.log({ sr, sc });

  const q = startPos.map(([r, c]) => ({ r, c, d: 0, path: [[r, c]], sr: r, sc: c }));
  // console.log({ q, l: q.length });
  const visited = new Set<string>();
  const endSet = new Set<string>();
  let p1 = 0;

  while (q.length > 0) {
    const { r, c, d, sr, sc, path } = q.shift()!;
    // console.log({ r, c, d, path });

    if (visited.has(`${r},${c}`)) continue;
    if (d === 9) {
      // console.log({ r, c, p1, sr, sc, path });
      // visited.add(`${r},${c}`);
      // console.log({ path });
      if (!endSet.has(`${r},${c},${sr},${sc}`)) {
        p1 += 1;
      }
      endSet.add(`${r},${c},${sr},${sc}`);
      continue;
    }
    visited.add(`${r},${c}`);

    [
      [r - 1, c], // up
      [r + 1, c], // down
      [r, c - 1], // left
      [r, c + 1], // right
    ].forEach(([nr, nc]) => {
      if (grid[nr]?.[nc] === `${d + 1}`) {
        q.push({ r: nr, c: nc, d: d + 1, sr, sc, path: [...path, [nr, nc]] });
      }
    });
  }

  // console.log({ p1 });
  return { part1: p1, part2: "" };
};

// 156 - wrong
