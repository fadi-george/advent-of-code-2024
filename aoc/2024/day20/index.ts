import { DIRS } from "../../constants";
import { findInGrid, manhattanDistance } from "../../lib/array";
import { getGrid } from "../../lib/general";
import { Grid, Point } from "../../types";

export default function solution(input: string) {
  const grid = getGrid(input);
  const [start, end] = [findInGrid(grid, "S"), findInGrid(grid, "E")];
  const bestPath = getBestPath(grid, start, end);

  return {
    part1: getCheatScore(bestPath, 2),
    part2: getCheatScore(bestPath, 20),
  };
}

const [ValidChars, SAVE_THRESHOLD] = [[".", "E"], 100];

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

export const getCheatScore = (bestPath: Point[], cheatLimit: number) => {
  let result = 0;

  // All values in path are free space so cutting through walls will land you back on a free space
  // if we use manhatten distance. Then it is a mater of checking if we're within the cheat limit.
  for (let i = 0; i < bestPath.length; i++)
    for (let j = i + 1; j < bestPath.length; j++) {
      const distance = manhattanDistance(bestPath[i], bestPath[j]);
      const stepDiff = j - i;
      if (distance <= cheatLimit && stepDiff - distance >= SAVE_THRESHOLD) result += 1;
    }

  return result;
};
