import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { findInGrid } from "../../lib/array";
import { DIRS } from "../../constants";

export default function solution(input: string) {
  const grid = input.split(/\n/).map((line) => line.split(""));

  const start = findInGrid(grid, "S");
  const end = findInGrid(grid, "E");

  const minSteps = getMinSteps(grid, start, end);
  const cheats = getCheats(grid, start, end, minSteps);
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
  minSteps: number
) => {
  const cheats: Record<number, number> = {};
  const visited = new Set<string>();
  const pq = new MinPriorityQueue<{
    r: number;
    c: number;
    steps: number;
    skipped: boolean;
  }>((v) => v.steps + (v.skipped ? 0 : 0));

  pq.enqueue({ r: start[0], c: start[1], steps: 0, skipped: false });

  while (!pq.isEmpty()) {
    const { r, c, steps, skipped } = pq.dequeue()!;

    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      const ch = grid[nr]?.[nc];
      if (!ch) continue;
      if (ch !== "#") {
        pq.enqueue({ r: nr, c: nc, steps: steps + 1, skipped });
      }

      if (!skipped) {
        if (nc === 0 || nc === grid[0].length - 1) continue;
        if (nr === 0 || nr === grid.length - 1) continue;
        if (ch === "#") {
          const grid2 = structuredClone(grid);
          grid2[nr][nc] = ".";

          const nr2 = nr + dr;
          const nc2 = nc + dc;
          const ch2 = grid2[nr2]?.[nc2];
          if (!ch2 || ch2 === "#" || !(ch2 === "." || ch2 === "E")) continue;

          if (visited.has(`${nr2},${nc2}`)) continue;
          visited.add(`${nr},${nc}`);
          const newSteps = getMinSteps(grid2, [nr, nc], end);
          if (newSteps === Infinity) continue;
          const total = steps + 1 + newSteps;
          const diff = minSteps - total;
          if (diff < 0) {
            continue;
          }
          cheats[diff] = (cheats[diff] ?? 0) + 1;
        }
      }
    }
  }

  // console.log({ cheats });
  return cheats;
};

// 28 wrong
const countCheats = (cheats: Record<number, number>) => {
  return Object.entries(cheats).reduce((a, [diff, count]) => {
    return a + (Number(diff) >= 100 ? count : 0);
  }, 0);
};
