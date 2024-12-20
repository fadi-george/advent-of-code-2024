import { DIRS } from "../../constants";
import { findInGrid, manhattanDistance } from "../../lib/array";
import { getGrid } from "../../lib/general";

type Grid = string[][];
type Cheats = Record<number, number>;

export default function solution(input: string) {
  const grid = getGrid(input);
  const start = findInGrid(grid, "S");
  const end = findInGrid(grid, "E");

  const bestPath = getBestPath(grid, start, end);

  return {
    part1: getCheatScore(findCheats(bestPath, 2)),
    part2: getCheatScore(findCheats(bestPath, 20)),
  };
}

export const getBestPath = (
  grid: Grid,
  start: [number, number],
  end: [number, number]
) => {
  const visited = new Set<string>();
  const q = [{ r: start[0], c: start[1], path: [start] }];

  while (q.length > 0) {
    const { r, c, path } = q.shift()!;
    if (r === end[0] && c === end[1]) return path;

    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      const char = grid[nr]?.[nc];
      if (char === "." || char === "E") {
        q.push({ r: nr, c: nc, path: [...path, [nr, nc]] });
      }
    }
  }
  return [];
};

export const findCheats = (bestPath: [number, number][], cheatLimit: number) => {
  const cheats: Cheats = {};

  for (let i = 0; i < bestPath.length; i++) {
    for (let j = i + 1; j < bestPath.length; j++) {
      const distance = manhattanDistance(bestPath[i], bestPath[j]);
      const stepDiff = j - i;

      if (distance <= cheatLimit) {
        const saved = stepDiff - distance;
        if (saved === 0) continue;
        cheats[saved] = (cheats[saved] || 0) + 1;
      }
    }
  }
  return cheats;
};

export const getCheatScore = (cheats: Cheats, threshold = 100) =>
  Object.entries(cheats).reduce((acc, [k, v]) => (+k >= threshold ? acc + v : acc), 0);
