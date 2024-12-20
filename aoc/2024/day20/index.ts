import { findInGrid } from "../../lib/array";
import { DIRS } from "../../constants";
import { makeGrid } from "../../lib/general";

export default function solution(input: string) {
  const grid = input.split(/\n/).map((line) => line.split(""));

  const start = findInGrid(grid, "S");
  const end = findInGrid(grid, "E");

  const cheats = getCheats(grid, start, end, 2);
  const count = countCheats(cheats);

  return { part1: count, part2: "" };
}

export const getCheats = (
  grid: string[][],
  start: [number, number],
  end: [number, number],
  skipCount: number
) => {
  const [w, h] = [grid[0].length, grid.length];
  const stepGrid = makeGrid(w, h, 0);

  for (let r = 0; r < h; r++)
    for (let c = 0; c < w; c++) if (grid[r][c] === "#") stepGrid[r][c] = -1;

  let minSteps = Infinity;
  const q = [{ r: start[0], c: start[1], steps: 0 }];
  const visited = new Set<string>();

  // count steps to each cell & goal
  let stepChange = 1;
  while (q.length > 0) {
    const { r, c, steps } = q.shift()!;

    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);

    stepGrid[r][c] = steps;

    if (r === end[0] && c === end[1]) {
      minSteps = Math.min(minSteps, steps);
      stepChange = -1;
    }

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (stepGrid[nr][nc] !== -1) q.push({ r: nr, c: nc, steps: steps + stepChange });
    }
  }

  // determine steps with cheats
  const cheats: Record<number, number> = {};
  const q2 = [
    {
      r: start[0],
      c: start[1],
      steps: 0,
      skipped: 0,
      path: [[start[0], start[1]]],
    },
  ];

  while (q2.length > 0) {
    const { r, c, steps, skipped, path } = q2.shift()!;

    if (stepGrid[r][c] !== -1 && steps > stepGrid[r][c]) {
      continue;
    }

    // out of cheats and trapped in a wall
    if (skipped === skipCount && stepGrid[r][c] === -1) {
      continue;
    }

    if (skipped && stepGrid[r][c] !== -1 && grid[r][c] !== "S") {
      if (grid[r][c] === "E") {
        const diff = minSteps - steps;
        if (diff > 0) {
          cheats[diff] = (cheats[diff] ?? 0) + 1;
        }
      } else {
        const diff = stepGrid[r][c] - steps;
        if (diff >= 0) {
          cheats[diff] = (cheats[diff] ?? 0) + 1;
        }
      }
      continue;
    }

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (stepGrid[nr][nc] !== -1)
        q2.push({
          r: nr,
          c: nc,
          steps: steps + 1,
          skipped,
          path: [...path, [nr, nc]],
        }); // walk normally

      if (skipped <= skipCount) {
        if (nc === 0 || nc === w - 1 || nr === 0 || nr === h - 1) continue; // skip edges of grid
        if (stepGrid[nr][nc] === -1) {
          // allowed to pass through walls
          q2.push({
            r: nr,
            c: nc,
            steps: steps + 1,
            skipped: skipped + 1,
            path: [...path, [nr, nc]],
          });
        }
      }
    }
  }

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
