import { MinPriorityQueue, PriorityQueue } from "@datastructures-js/priority-queue";
import { findInGrid } from "../../lib/array";
import { mod } from "../../lib/general";

type Grid = string[][];

enum Direction {
  North,
  East,
  South,
  West,
}

const DirMap = {
  [Direction.North]: [-1, 0],
  [Direction.East]: [0, 1],
  [Direction.South]: [1, 0],
  [Direction.West]: [0, -1],
};

export default (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  const [r, c] = findInGrid(grid, "S");
  // console.table(grid);
  const score = solveMaze(grid, r, c);
  // console.table(grid);

  return {
    part1: score,
    part2: "TODO",
  };
};

type Info = {
  r: number;
  c: number;
  dir: Direction;
  score: number;
};

const solveMaze = (grid: Grid, r: number, c: number) => {
  const visited = new Set<string>();

  const pq = new MinPriorityQueue((v: Info) => v.score);
  pq.enqueue({ r, c, dir: Direction.East, score: 0 });

  while (!pq.isEmpty()) {
    const { r, c, dir, score } = pq.dequeue();

    const ch = grid[r][c];
    if (!ch || ch === "#") continue;
    if (ch === "E") return score;

    const key = `${r},${c},${dir}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const [dr, dc] = DirMap[dir];
    const nR = r + dr;
    const nC = c + dc;

    pq.enqueue({
      r: nR,
      c: nC,
      dir: dir,
      score: score + 1,
    });

    // turn left
    pq.enqueue({
      r,
      c,
      dir: mod(dir - 1, 4),
      score: score + 1000,
    });

    // turn right
    pq.enqueue({
      r,
      c,
      dir: mod(dir + 1, 4),
      score: score + 1000,
    });
  }

  return Infinity;
};
