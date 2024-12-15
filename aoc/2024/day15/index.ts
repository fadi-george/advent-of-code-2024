import { printGrid } from "../../lib/general";

const chMap = {
  ".": [".", "."],
  O: ["[", "]"],
  "#": ["#", "#"],
  "@": ["@", "."],
};

type Grid = string[][];

export default (input: string) => {
  const [gridLines, moveLines] = input.split("\n\n");
  const moves = moveLines.replace(/\n/g, "");

  const grid = gridLines.split("\n").map((line) => line.split(""));
  const grid2 = grid.map((l) => l.flatMap((c) => chMap[c as keyof typeof chMap]));

  const [sR, sC] = findRobot(grid);
  const [sR2, sC2] = findRobot(grid2);
  let [r, c, r2, c2] = [sR, sC, sR2, sC2];

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    [r, c] = moveRobot(grid, r, c, move);
    [r2, c2] = moveRobot(grid2, r2, c2, move);
  }

  const p1 = sumCoords(getBoxCoord(grid));
  const p2 = sumCoords(getBoxCoord(grid2));

  return {
    part1: p1,
    part2: p2,
  };
};

export const findRobot = (grid: Grid) => {
  const r = grid.findIndex((line) => line.includes("@"));
  const c = grid[r].indexOf("@");
  return [r, c];
};

export const moveRobot = (grid: Grid, r: number, c: number, move: string) => {
  const [w, h] = [grid[0].length, grid.length];
  const moves = { "^": [-1, 0], v: [1, 0], "<": [0, -1], ">": [0, 1] };
  const [dr, dc] = moves[move as keyof typeof moves];
  const ch = grid[r + dr]?.[c + dc];

  if (ch === "#") return [r, c];

  if (ch === ".") {
    grid[r][c] = ".";
    grid[r + dr][c + dc] = "@";
    return [r + dr, c + dc];
  }

  const isVertical = move === "^" || move === "v";
  const reverse = move === "^" || move === "<";
  const pos = isVertical ? r : c;
  const dim = isVertical ? h : w;

  let freeI = -1;
  for (let i = pos; reverse ? i >= 0 : i < dim; i += reverse ? -1 : 1) {
    const ch = isVertical ? grid[i][c] : grid[r][i];
    if (ch === "#") break;
    if (ch === ".") {
      freeI = i;
      break;
    }
  }

  if (freeI === -1) return [r, c];

  if (ch === "O") {
    const start = Math.min(freeI, pos);
    const end = Math.max(freeI, pos);
    for (
      let i = reverse ? start : end;
      reverse ? i <= end : i >= start;
      i += reverse ? 1 : -1
    ) {
      if (isVertical) {
        grid[i][c] = grid[i + (reverse ? 1 : -1)][c];
      } else {
        grid[r][i] = grid[r][i + (reverse ? 1 : -1)];
      }
    }

    grid[r][c] = ".";
    return [r + dr, c + dc];
  }

  // check if big box is blocked
  if (move === "^" || move === "v") {
    blockVisited.clear();
    if (isBlocked(grid, move === "^" ? r - 1 : r + 1, c, move)) return [r, c];
  }

  moveBigBox(grid, r, c, freeI, move); // otherwise move big box
  visited.clear();

  return [r + dr, c + dc];
};

const blockVisited = new Set<string>();
const isBlocked = (grid: string[][], r: number, c: number, move: string) => {
  const key = `${r},${c}`;
  if (blockVisited.has(key)) return false;
  blockVisited.add(key);

  switch (move) {
    case "^":
      for (let i = r; i >= 0; i--) {
        if (grid[i][c] === "#") return true;
        if (grid[i][c] === "]") {
          // check left side of box
          if (isBlocked(grid, i, c - 1, move)) {
            return true;
          }
        }
        if (grid[i][c] === "[") {
          // check right side of box
          if (isBlocked(grid, i, c + 1, move)) {
            return true;
          }
        }
        if (grid[i][c] === ".") break;
      }
      break;

    case "v":
      for (let i = r; i < grid.length; i++) {
        if (grid[i][c] === "#") return true;
        if (grid[i][c] === "]") {
          if (isBlocked(grid, i, c - 1, move)) return true;
        }
        if (grid[i][c] === "[") {
          if (isBlocked(grid, i, c + 1, move)) return true;
        }
        if (grid[i][c] === ".") break;
      }
      break;
  }
  return false;
};

const visited = new Set<string>();
const findTouchingBoxes = (grid: Grid, r: number, c: number, dr: number): number[][] => {
  const key = `${r},${c}`;
  if (visited.has(key)) return [];
  visited.add(key);

  const ch = grid[r][c];
  if (ch === ".") return [[r, c]];

  const next = ch === "]" ? c - 1 : ch === "[" ? c + 1 : null;
  if (next === null) return [];

  return [
    [r, c],
    ...findTouchingBoxes(grid, r, next, dr),
    ...findTouchingBoxes(grid, r + dr, c, dr),
  ];
};

export const moveBigBox = (
  grid: string[][],
  r: number,
  c: number,
  freeI: number,
  move: string
) => {
  switch (move) {
    case "^": {
      // find all touching boxes indices
      const touchingBoxes = findTouchingBoxes(grid, r - 1, c, -1).sort(
        (a, b) => a[0] - b[0]
      );
      for (const [i, j] of touchingBoxes)
        grid[i][j] = visited.has(`${i + 1},${j}`) ? grid[i + 1][j] : ".";
      grid[r - 1][c] = "@";
      break;
    }

    case "v": {
      const touchingBoxes = findTouchingBoxes(grid, r + 1, c, 1).sort(
        (a, b) => b[0] - a[0]
      );
      for (const [i, j] of touchingBoxes)
        grid[i][j] = visited.has(`${i - 1},${j}`) ? grid[i - 1][j] : ".";
      grid[r + 1][c] = "@";
      break;
    }

    case ">": {
      for (let i = freeI; i >= c; i--) {
        grid[r][i] = grid[r][i - 1];
      }
      break;
    }

    case "<": {
      for (let i = freeI; i <= c; i++) {
        grid[r][i] = grid[r][i + 1];
      }
      break;
    }
  }
  grid[r][c] = ".";
};

const getBoxCoord = (grid: string[][]) =>
  grid
    .flatMap((row, r) => row.map((ch, c) => (ch === "O" || ch === "[" ? [r, c] : null)))
    .filter(Boolean) as number[][];

const sumCoords = (coords: number[][]) =>
  coords.reduce((a, [r, c]) => a + 100 * r + c, 0);
