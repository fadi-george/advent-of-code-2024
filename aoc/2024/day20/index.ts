import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { findInGrid } from "../../lib/array";

export default function solution(input: string) {
  const grid = input.split(/\n/).map((line) => line.split(""));

  const start = findInGrid(grid, "S");
  const end = findInGrid(grid, "E");
  console.log({
    start,
    end,
  });

  const result = solve(grid, start, end);

  return { part1: "", part2: "" };
}

type Info = { r: number; c: number; steps: number };

const solve = (grid: string[][], start: [number, number], end: [number, number]) => {
  const visited = new Set<string>();
  // const queue: [number, number, number][] = [[start[0], start[1], 0]];

  const pq = new MinPriorityQueue<Info>((v) => v.steps);
  pq.enqueue({ r: start[0], c: start[1], steps: 0 });

  while (!pq.isEmpty()) {
    const { r, c, steps } = pq.dequeue()!;
    if (r === end[0] && c === end[1]) {
      console.log({ steps });
      break;
    }
    if (visited.has(`${r},${c}`)) continue;
    visited.add(`${r},${c}`);

    for (const [dr, dc] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nr = r + dr;
      const nc = c + dc;
      // if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) continue;
      const ch = grid[nr]?.[nc];
      if (!ch || ch === "#") continue;
      pq.enqueue({ r: nr, c: nc, steps: steps + 1 });
    }
  }
};
