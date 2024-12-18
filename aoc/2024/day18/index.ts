import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { DIRS } from "../../constants";

const SIZE = process.env.FILE === "input" ? 71 : 7;
const BYTES = process.env.FILE === "input" ? 1024 : 12;

export default (input: string, size = SIZE, bytes = BYTES) => {
  const lines = input.split(/\n/);
  const coords = lines.map((line) => line.split(",").map(Number));

  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ".")
  );

  for (let i = 0; i < bytes; i++) {
    const [x, y] = coords[i];
    grid[y][x] = "#";
  }
  const p1 = solve(grid);
  const p2 = findBlockingByte(size, coords);
  console.log(p2);

  return {
    part1: p1,
    part2: p2.join(","),
  };
};

type Info = {
  r: number;
  c: number;
  steps: number;
  path: Set<string>;
};

const solve = (grid: string[][]) => {
  const visited = new Map<string, number>();
  const pq = new MinPriorityQueue((v: Info) => v.steps);
  pq.enqueue({ r: 0, c: 0, steps: 0, path: new Set([`0,0`]) });

  const size = grid.length;
  let minSteps = Infinity;
  let minPath = new Set<string>();

  while (!pq.isEmpty()) {
    const { r, c, steps, path } = pq.dequeue();
    if (r === size - 1 && c === size - 1) {
      minSteps = steps;
      minPath = path;
      break;
    }

    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.set(key, steps);

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      const ch = grid[nr]?.[nc];
      if (!ch || ch === "#") continue;
      pq.enqueue({ r: nr, c: nc, steps: steps + 1, path: new Set([...path, key]) });
    }
  }

  // for (const key of minPath) {
  //   const [r, c] = key.split(",").map(Number);
  //   grid[r][c] = "O";
  // }
  // console.table(grid);

  // console.table(grid);
  return minSteps;
};

// const debug
// 140 wrong
const findBlockingByte = (size: number, coords: number[][]) => {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ".")
  );

  for (let i = 0; i < coords.length; i++) {
    const [x, y] = coords[i];
    grid[y][x] = "#";

    let steps = solve(grid);
    if (steps === Infinity) return [x, y];
  }
  return null;
};
