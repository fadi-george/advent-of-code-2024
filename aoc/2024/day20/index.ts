import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { findInGrid } from "../../lib/array";
import { DIRS } from "../../constants";
import { makeGrid } from "../../lib/general";

export default function solution(input: string) {
  const grid = input.split(/\n/).map((line) => line.split(""));

  const start = findInGrid(grid, "S");
  const end = findInGrid(grid, "E");

  const minSteps = getMinSteps(grid, start, end);
  const cheats = getCheats(grid, start, end, minSteps, 2);
  const count = countCheats(cheats);

  return { part1: count, part2: "" };
}

const getMinSteps = (
  grid: string[][],
  start: [number, number],
  end: [number, number]
): number => {
  const visited = new Set<string>();
  const pq = new MinPriorityQueue<{ r: number; c: number; steps: number }>(
    (v) => v.steps
  );
  pq.enqueue({ r: start[0], c: start[1], steps: 0 });

  while (!pq.isEmpty()) {
    const { r, c, steps } = pq.dequeue()!;

    if (r === end[0] && c === end[1]) return steps;

    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      const ch = grid[nr]?.[nc];
      if (!ch || ch === "#") continue;
      pq.enqueue({ r: nr, c: nc, steps: steps + 1 });
    }
  }
  return Infinity;
};

export const getCheats = (
  grid: string[][],
  start: [number, number],
  end: [number, number],
  minSteps: number,
  skipCount: number
) => {
  const [w, h] = [grid[0].length, grid.length];
  const stepGrid = makeGrid(w, h, 0);

  const flood = (r: number, c: number) => {};

  // const cheats: Record<number, number> = {};
  // const cheats: Record<number, number> = {};
  // const visited = new Set<string>();
  // const pq = new MinPriorityQueue<{
  //   r: number;
  //   c: number;
  //   steps: number;
  //   skipped: number;
  // }>((v) => v.steps + (v.skipped ? 0 : 0));

  // pq.enqueue({ r: start[0], c: start[1], steps: 0, skipped: 0 });

  // while (!pq.isEmpty()) {
  //   const { r, c, steps, skipped } = pq.dequeue()!;

  //   if (r === end[0] && c === end[1]) {
  //     const diff = minSteps - steps;
  //     cheats[diff] = (cheats[diff] ?? 0) + 1;
  //     continue;
  //   }

  //   if (grid[r][c] === "#" && skipped === skipCount) {
  //     continue;
  //   }

  //   const key = `${r},${c},${skipped}`;
  //   if (visited.has(key)) continue;
  //   visited.add(key);

  //   for (const [dr, dc] of DIRS) {
  //     const nr = r + dr;
  //     const nc = c + dc;
  //     const ch = grid[nr]?.[nc];
  //     if (!ch) continue;
  //     if (ch !== "#") {
  //       pq.enqueue({ r: nr, c: nc, steps: steps + 1, skipped });
  //     }

  //     if (skipped <= skipCount) {
  //       if (nc === 0 || nc === w - 1 || nr === 0 || nr === h - 1) continue;
  //       if (ch === "#") {
  //         pq.enqueue({ r: nr, c: nc, steps: steps + 1, skipped: skipped + 1 });
  //       }
  //     }
  //   }
  // }

  // console.log({ cheats });
  return cheats;
};

const countCheats = (cheats: Record<number, number>) => {
  return Object.entries(cheats).reduce((a, [diff, count]) => {
    return a + (Number(diff) >= 100 ? count : 0);
  }, 0);
};

// sample2
// 0,1
// 2.2
