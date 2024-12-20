import { DIRS } from "../../constants";
import { findInGrid, manhattanDistance } from "../../lib/array";
import { getGrid } from "../../lib/general";
import { Grid, Point } from "../../types";

// Alternative solution that creates a Cheats object and then calculates the score
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

const ValidChars = [".", "E"];

export const getBestPath = (grid: Grid, start: Point, end: Point) => {
  const visited = new Set<string>();
  const q = [{ r: start[0], c: start[1], path: [start] }];

  while (q.length > 0) {
    const { r, c, path } = q.shift()!;
    if (r === end[0] && c === end[1]) return path;

    if (visited.has(`${r},${c}`)) continue;
    visited.add(`${r},${c}`);

    for (const [dr, dc] of DIRS)
      if (ValidChars.includes(grid[r + dr]?.[c + dc]))
        q.push({ r: r + dr, c: c + dc, path: [...path, [r + dr, c + dc]] });
  }
  return [];
};

type Cheats = Record<number, number>;

export const findCheats = (bestPath: Point[], cheatLimit: number) => {
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
