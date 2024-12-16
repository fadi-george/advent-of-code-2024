import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { findInGrid } from "../../lib/array";
import { mod } from "../../lib/general";

type Grid = string[][];
type Info = {
  r: number;
  c: number;
  dir: number;
  score: number;
};

// prettier-ignore
const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

export default (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  const [r, c] = findInGrid(grid, "S");
  const score = solveMaze(grid, r, c);

  return {
    part1: score,
    part2: "TODO",
  };
};

const solveMaze = (grid: Grid, row: number, col: number) => {
  const visited = new Set<string>();
  const pq = new MinPriorityQueue((v: Info) => v.score);
  pq.enqueue({ r: row, c: col, dir: 1, score: 0 });

  while (!pq.isEmpty()) {
    const { r, c, dir, score } = pq.dequeue();
    const ch = grid[r]?.[c];

    if (!ch || ch === "#") continue;
    if (ch === "E") return score;

    const key = `${r},${c},${dir}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const [dr, dc] = DIRS[dir];

    // Forward movement & left & right turns
    pq.enqueue({ r: r + dr, c: c + dc, dir, score: score + 1 });
    pq.enqueue({ r, c, dir: mod(dir - 1, 4), score: score + 1000 });
    pq.enqueue({ r, c, dir: mod(dir + 1, 4), score: score + 1000 });
  }

  return Infinity;
};
