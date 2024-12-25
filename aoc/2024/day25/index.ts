import { getGrid } from "../../lib/general";
import { Grid } from "../../types";

export default function solution(input: string) {
  const schematics = input.split("\n\n");
  const grids = schematics.map((schematic) => getGrid(schematic));
  const { locks, keys } = Object.groupBy(grids, (grid) =>
    grid[0][0].includes("#") ? "locks" : "keys"
  );

  const height = locks![0].length - 2; // remove the top and bottom
  const lockHeights = locks!.map(getLockHeight);
  const keyHeights = keys!.map(getKeyHeight);
  const p1 = countKeyFit(lockHeights, keyHeights, height);

  return { part1: p1, part2: "" };
}

const getLockHeight = (grid: Grid) => {
  const [w, h] = [grid[0].length, grid.length];
  const heights = [];
  for (let j = 0; j < w; j++) {
    let height = -1;
    for (let i = 0; i < h; i++) {
      if (grid[i][j] === "#") {
        height++;
      } else {
        break;
      }
    }
    heights.push(height);
  }
  return heights;
};

const getKeyHeight = (grid: Grid) => {
  const [w, h] = [grid[0].length, grid.length];
  const heights = [];
  for (let j = 0; j < w; j++) {
    let height = -1;
    for (let i = h - 1; i >= 0; i--) {
      if (grid[i][j] === "#") {
        height++;
      } else {
        break;
      }
    }
    heights.push(height);
  }
  return heights;
};

const checkLockAndKey = (lockHeights: number[], keyHeights: number[], height: number) => {
  const sum = [];
  for (let i = 0; i < lockHeights.length; i++) {
    sum.push(lockHeights[i] + keyHeights[i]);
  }
  return sum.every((h) => h <= height);
};

const countKeyFit = (lockHeights: number[][], keyHeights: number[][], height: number) => {
  let count = 0;
  for (let i = 0; i < lockHeights.length; i++) {
    const lockHeight = lockHeights[i];
    for (let j = 0; j < keyHeights.length; j++) {
      const keyHeight = keyHeights[j];
      if (checkLockAndKey(lockHeight, keyHeight, height)) {
        count++;
      }
    }
  }
  return count;
};
