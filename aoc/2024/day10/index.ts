const DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export default (input: string) => {
  const grid = input.split("\n");

  const startPos = [];
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[r].length; c++)
      if (grid[r][c] === "0") startPos.push([r, c]);

  const q = startPos.map(([r, c]) => ({ sr: r, sc: c, r, c }));
  const endSet = new Set<string>();
  let [p1, p2] = [0, 0];

  while (q.length > 0) {
    const { r, c, sr, sc } = q.shift()!;
    const height = +grid[r][c];

    if (height === 9) {
      // must be a unique trail from a different start positions
      const key = `${r},${c},${sr},${sc}`;
      if (!endSet.has(key)) {
        p1 += 1;
        endSet.add(key);
      }
      p2 += 1;
      continue;
    }

    for (const [dr, dc] of DIRS)
      if (grid[r + dr]?.[c + dc] === `${height + 1}`)
        q.push({ sr, sc, r: r + dr, c: c + dc });
  }

  return { part1: p1, part2: p2 };
};
