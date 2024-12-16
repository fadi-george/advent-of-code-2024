import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { findInGrid } from "../../lib/array";
import { mod } from "../../lib/general";

type Grid = string[][];
type Info = {
  r: number;
  c: number;
  dir: number;
  score: number;
};

// prettier-ignore
const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // N (0), E (1), S (2), W (3)

export default (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  const [r, c] = findInGrid(grid, "S");
  return {
    part1: getMinScore(grid, r, c),
    part2: getTiles(grid, r, c),
  };
};

const getMinScore = (grid: Grid, row: number, col: number) => {
  const visited = new Set<string>();
  const pq = new MinPriorityQueue((v: Info) => v.score);
  pq.enqueue({ r: row, c: col, dir: 1, score: 0 });

  while (!pq.isEmpty()) {
    const { r, c, dir, score } = pq.dequeue();
    const ch = grid[r]?.[c];

    if (!ch || ch === "#") continue;
    if (ch === "E") return score;

    const key = `${r},${c},${dir}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const [dr, dc] = DIRS[dir];

    // Forward movement & left & right turns
    pq.enqueue({ r: r + dr, c: c + dc, dir, score: score + 1 });
    pq.enqueue({ r, c, dir: mod(dir - 1, 4), score: score + 1000 });
    pq.enqueue({ r, c, dir: mod(dir + 1, 4), score: score + 1000 });
  }

  return Infinity;
};

type Tile = Info & {
  path: Set<string>;
};

const getTiles = (grid: Grid, row: number, col: number) => {
  let bestScore = Infinity;
  let tiles = new Set<string>();
  const visited = new Map<string, number>();
  const pq = new MinPriorityQueue((v: Tile) => v.score);
  pq.enqueue({ r: row, c: col, dir: 1, score: 0, path: new Set([`${row},${col}`]) });

  while (!pq.isEmpty()) {
    const { r, c, dir, score, path } = pq.dequeue();
    if (score > bestScore) continue;

    const ch = grid[r]?.[c];
    if (!ch || ch === "#") continue;
    if (ch === "E") {
      path.add(`${r},${c}`);
      tiles = tiles.union(path);
      bestScore = score;
      continue;
    }

    const key = `${r},${c},${dir}`;
    const visitedScore = visited.get(key);
    if (visitedScore) {
      if (score > visitedScore) continue;
    } else {
      visited.set(key, score);
    }

    const [dr, dc] = DIRS[dir];
    const newPath = new Set(path);
    newPath.add(`${r},${c}`);

    pq.enqueue({ r: r + dr, c: c + dc, dir, score: score + 1, path: newPath });
    pq.enqueue({ r, c, dir: mod(dir - 1, 4), score: score + 1000, path: newPath });
    pq.enqueue({ r, c, dir: mod(dir + 1, 4), score: score + 1000, path: newPath });
  }

  // for (const tile of tiles) {
  //   const [r, c] = tile.split(",").map(Number);
  //   grid[r][c] = "O";
  // }
  // console.table(grid);
  return tiles.size;
};
