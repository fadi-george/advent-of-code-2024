import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { findInGrid } from "../../lib/array";
import { mod } from "../../lib/general";

type Grid = string[][];
type Info = { r: number; c: number; dir: number; score: number; path?: Set<string> };

// prettier-ignore
const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // N (0), E (1), S (2), W (3)

export default (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));
  const [r, c] = findInGrid(grid, "S");
  const [score, tiles] = traverse(grid, r, c);
  return { part1: score, part2: tiles };
};

const traverse = (grid: Grid, row: number, col: number) => {
  const visited = new Map<string, number>();
  const pq = new MinPriorityQueue((v: Info) => v.score);
  let [bestScore, tiles] = [Infinity, new Set<string>()];

  pq.enqueue({ r: row, c: col, dir: 1, score: 0, path: new Set([`${row},${col}`]) });

  while (!pq.isEmpty()) {
    const { r, c, dir, score, path = new Set() } = pq.dequeue();
    if (score > bestScore) continue;

    const ch = grid[r]?.[c];
    if (!ch || ch === "#") continue;

    if (ch === "E") {
      // first time we find the end, we have the best score and we exclude paths that are worse
      bestScore = score;
      tiles = tiles.union(path.add(`${r},${c}`));
      continue;
    }

    const key = `${r},${c},${dir}`;
    if (visited.get(key) && score > visited.get(key)!) continue;
    visited.set(key, score);

    const [dr, dc] = DIRS[dir];
    const newPath = new Set(path).add(`${r},${c}`);
    pq.enqueue({ r: r + dr, c: c + dc, dir, score: score + 1, path: newPath });
    pq.enqueue({ r, c, dir: mod(dir - 1, 4), score: score + 1000, path: newPath }); // turns cost 1000 and you don't move
    pq.enqueue({ r, c, dir: mod(dir + 1, 4), score: score + 1000, path: newPath });
  }
  return [bestScore, tiles.size];
};
