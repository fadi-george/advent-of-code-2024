import { DIRS } from "../../constants";

export default (input: string) => {
  const grid = input.split("\n");

  const startPos = [];
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[r].length; c++)
      if (grid[r][c] === "0") startPos.push([r, c]);

  const q = startPos.map(([r, c]) => ({ sr: r, sc: c, r, c }));
  const trailSet = new Set<string>();
  let p2 = 0;

  while (q.length > 0) {
    const { r, c, sr, sc } = q.shift()!;
    const height = +grid[r][c];

    if (height === 9) {
      // must be a unique trail from a different start positions
      trailSet.add(`${r},${c},${sr},${sc}`);
      p2 += 1;
      continue;
    }

    for (const [dr, dc] of DIRS)
      if (grid[r + dr]?.[c + dc] === `${height + 1}`)
        q.push({ sr, sc, r: r + dr, c: c + dc });
  }

  return { part1: trailSet.size, part2: p2 };
};
