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
    part1: getMinSteps(grid),
    part2: findBlockingByte(size, byteCoords),
  };
};

type Info = { r: number; c: number; steps: number };

const getMinSteps = (grid: string[][]) => {
  const [size, visited] = [grid.length, new Set<string>()];

  const pq = new MinPriorityQueue((v: Info) => v.steps);
  pq.enqueue({ r: 0, c: 0, steps: 0 });

  while (!pq.isEmpty()) {
    const { r, c, steps } = pq.dequeue();
    if (r === size - 1 && c === size - 1) return steps;

    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);

    for (const [dr, dc] of DIRS)
      if (grid[r + dr]?.[c + dc] === ".")
        pq.enqueue({ r: r + dr, c: c + dc, steps: steps + 1 });
  }
  return Infinity;
};

const findBlockingByte = (size: number, coords: number[][]) => {
  const grid = makeGrid(size, size, ".");
  coords.forEach(([x, y]) => (grid[y][x] = "#"));

  // working backwards, remove each byte and check if it's possible to reach the end
  for (let i = coords.length - 1; i >= 0; i--) {
    const [x, y] = coords[i];
    grid[y][x] = ".";
    if (getMinSteps(grid) !== Infinity) return [x, y].join(",");
  }
};
