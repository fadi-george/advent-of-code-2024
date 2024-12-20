import { DIRS } from "../../constants";
import { findInGrid, manhattanDistance } from "../../lib/array";
import { getGrid } from "../../lib/general";
import { Grid, Point } from "../../types";

export default function solution(input: string) {
  const grid = getGrid(input);
  const [start, end] = [findInGrid(grid, "S"), findInGrid(grid, "E")];
  const bestPath = getBestPath(grid, start, end);

  return getCheatScore(bestPath);
}

const [ValidChars, SAVE_THRESHOLD, CHEAT_LIMIT] = [[".", "E"], 100, 20];

export const getBestPath = (grid: Grid, start: Point, end: Point) => {
  const visited = new Set<string>();
  const q = [[start]];

  while (q.length > 0) {
    const path = q.shift()!;
    const [r, c] = path[path.length - 1];
    if (r === end[0] && c === end[1]) return path;

    if (visited.has(`${r},${c}`)) continue;
    visited.add(`${r},${c}`);

    for (const [dr, dc] of DIRS)
      if (ValidChars.includes(grid[r + dr]?.[c + dc]))
        q.push([...path, [r + dr, c + dc]]);
  }
  return [];
};

export const getCheatScore = (bestPath: Point[]) => {
  let [p1, p2] = [0, 0];

  // All values in best path are free space so cutting through walls will land you back on a free space
  // if we use Manhattan distance. Then it is a mater of checking if we're within the cheat limit.
  for (let i = 0; i < bestPath.length; i++)
    for (let j = i + 1; j < bestPath.length; j++) {
      const distance = manhattanDistance(bestPath[i], bestPath[j]);
      const stepDiff = j - i;
      if (distance <= CHEAT_LIMIT && stepDiff - distance >= SAVE_THRESHOLD) {
        p1 += distance <= 2 ? 1 : 0;
        p2 += 1;
      }
    }

  return { part1: p1, part2: p2 };
};
