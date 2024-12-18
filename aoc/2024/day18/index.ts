import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { DIRS } from "../../constants";
import { makeGrid } from "../../lib/general";

const [SIZE, BYTES] = process.env.FILE === "input" ? [71, 1024] : [7, 12];

export default (input: string, size = SIZE, bytes = BYTES) => {
  const lines = input.split(/\n/);
  const byteCoords = lines.map((l) => l.split(",").map(Number));

  const grid = makeGrid(size, size, ".");

  byteCoords.slice(0, bytes).forEach(([x, y]) => (grid[y][x] = "#"));

  return {
    part1: solve(grid),
    part2: findBlockingByte(size, byteCoords),
  };
};

type Info = {
  r: number;
  c: number;
  steps: number;
};

const solve = (grid: string[][]) => {
  const visited = new Map<string, number>();
  const pq = new MinPriorityQueue((v: Info) => v.steps);
  pq.enqueue({ r: 0, c: 0, steps: 0 });

  const size = grid.length;
  let minSteps = Infinity;

  while (!pq.isEmpty()) {
    const { r, c, steps } = pq.dequeue();
    if (r === size - 1 && c === size - 1) {
      minSteps = steps;
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
      pq.enqueue({ r: nr, c: nc, steps: steps + 1 });
    }
  }

  return minSteps;
};

const findBlockingByte = (size: number, coords: number[][]) => {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ".")
  );

  coords.forEach(([x, y]) => {
    grid[y][x] = "#";
  });

  for (let i = coords.length - 1; i >= 0; i--) {
    const [x, y] = coords[i];
    grid[y][x] = ".";
    let steps = solve(grid);
    if (steps !== Infinity) return coords[i].join(",");
  }
  return null;
};
