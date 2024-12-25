import { getGrid } from "../../lib/general";
import { Grid } from "../../types";

export default function solution(input: string) {
  const { locks, keys } = Object.groupBy(
    input.split("\n\n").map((s) => getGrid(s)),
    (g) => (g[0][0].includes("#") ? "locks" : "keys")
  );

  const height = locks![0].length - 2; // remove the top and bottom
  const lockHeights = locks!.map(getLockHeight);
  const keyHeights = keys!.map(getKeyHeight);
  const p1 = countKeyFit(lockHeights, keyHeights, height);

  return { part1: p1, part2: "FREE STAR" };
}

const getHeight = (grid: Grid, fromBottom: boolean = false) =>
  grid[0].map((_, col) => {
    const column = grid.map((row) => row[col]);
    const searchArray = fromBottom ? column.reverse() : column;
    return searchArray.findIndex((cell) => cell !== "#") - 1;
  });

const getLockHeight = (grid: Grid) => getHeight(grid);
const getKeyHeight = (grid: Grid) => getHeight(grid, true);

const checkLockAndKey = (lockHeights: number[], keyHeights: number[], height: number) =>
  lockHeights.every((h, i) => h + keyHeights[i] <= height);

const countKeyFit = (lockHeights: number[][], keyHeights: number[][], height: number) =>
  lockHeights.reduce(
    (count, lock) =>
      count + keyHeights.filter((key) => checkLockAndKey(lock, key, height)).length,
    0
  );
