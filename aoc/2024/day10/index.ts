import { DIRS } from "../../constants";

const END_HEIGHT = 9;

export default (input: string) => {
  const grid = input.split("\n").map((r) => r.split("").map(Number));

  // get all start positions (height 0)
  const startPos = [];
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[r].length; c++) if (grid[r][c] === 0) startPos.push([r, c]);

  // explore all trails from all start positions
  const q = startPos.map(([r, c]) => ({ sr: r, sc: c, r, c }));
  const trailSet = new Set<string>();
  let p2 = 0;

  while (q.length > 0) {
    const { r, c, sr, sc } = q.shift()!;
    const height = grid[r][c];

    if (height === END_HEIGHT) {
      // part 1 - must be a unique trail from a different start positions
      // part 2 - start position does not matter
      trailSet.add(`${r},${c},${sr},${sc}`);
      p2 += 1;
      continue;
    }

    // go up, right, down, left
    for (const [dr, dc] of DIRS)
      if (grid[r + dr]?.[c + dc] === height + 1) q.push({ sr, sc, r: r + dr, c: c + dc });
  }

  return { part1: trailSet.size, part2: p2 };
};
