import { DIRS } from "../../constants";

const [START_HEIGHT, END_HEIGHT] = [0, 9];

export default (input: string) => {
  const grid = input
    .split("\n")
    .map((r) => r.split("").map((c) => (c === "." ? -1 : Number(c))));

  // get all start positions (height 0)
  const startPos = [];
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[r].length; c++)
      if (grid[r][c] === START_HEIGHT) startPos.push([r, c]);

  const uniquePaths = new Set<string>();
  let paths = 0;

  const dfs = (r: number, c: number, sr: number, sc: number) => {
    const height = grid[r][c];

    if (height === END_HEIGHT) {
      // part 1 - must be a unique trail from a different start positions
      // part 2 - start position does not matter
      uniquePaths.add(`${sr},${sc},${r},${c}`);
      paths++;
      return;
    }

    // go up, right, down, left
    for (const [dr, dc] of DIRS)
      if (grid[r + dr]?.[c + dc] === height + 1) dfs(r + dr, c + dc, sr, sc);
  };

  for (const [sr, sc] of startPos) dfs(sr, sc, sr, sc);

  return {
    part1: uniquePaths.size,
    part2: paths,
  };
};
