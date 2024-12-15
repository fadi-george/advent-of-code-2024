const chMap = { ".": [".", "."], O: ["[", "]"], "#": ["#", "#"], "@": ["@", "."] };
const moves = { "^": [-1, 0], v: [1, 0], "<": [0, -1], ">": [0, 1] };
type Grid = string[][];

export default (input: string) => {
  const [gridLines, moveLines] = input.split("\n\n");
  const moves = moveLines.replace(/\n/g, "");

  const grid = gridLines.split("\n").map((line) => line.split(""));
  const grid2 = grid.map((l) => l.flatMap((c) => chMap[c as keyof typeof chMap]));
  let [r, c] = findRobot(grid);
  let [r2, c2] = findRobot(grid2);

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    [r, c] = moveRobot(grid, r, c, move);
    [r2, c2] = moveRobot(grid2, r2, c2, move);
  }

  return {
    part1: sumCoords(getBoxCoord(grid)),
    part2: sumCoords(getBoxCoord(grid2)),
  };
};

export const findRobot = (grid: Grid) => {
  const r = grid.findIndex((line) => line.includes("@"));
  return [r, grid[r].indexOf("@")];
};

export const moveRobot = (grid: Grid, r: number, c: number, move: string) => {
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
  const dim = isVertical ? grid.length : grid[0].length;

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
    const [start, end] = [Math.min(freeI, pos), Math.max(freeI, pos)];
    for (
      let i = reverse ? start : end;
      reverse ? i <= end : i >= start;
      i += reverse ? 1 : -1
    ) {
      isVertical
        ? (grid[i][c] = grid[i + (reverse ? 1 : -1)][c])
        : (grid[r][i] = grid[r][i + (reverse ? 1 : -1)]);
    }
    grid[r][c] = ".";
    return [r + dr, c + dc];
  }

  if (move === "^" || move === "v") {
    blockVisited.clear();
    if (isBlocked(grid, move === "^" ? r - 1 : r + 1, c, move)) return [r, c];
  }

  visited.clear();
  moveBigBox(grid, r, c, freeI, move);
  return [r + dr, c + dc];
};

const blockVisited = new Set<string>();
const isBlocked = (grid: string[][], r: number, c: number, move: string) => {
  const key = `${r},${c}`;
  if (blockVisited.has(key)) return false;
  blockVisited.add(key);

  const [start, end, step] = move === "^" ? [r, 0, -1] : [r, grid.length, 1];

  // check if current box or boxes in front of it are blocked
  for (let i = start; move === "^" ? i >= end : i < end; i += step) {
    if (grid[i][c] === "#") return true;
    if (grid[i][c] === "]" && isBlocked(grid, i, c - 1, move)) return true;
    if (grid[i][c] === "[" && isBlocked(grid, i, c + 1, move)) return true;
    if (grid[i][c] === ".") break;
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
  grid: Grid,
  r: number,
  c: number,
  freeI: number,
  move: string
) => {
  // move one or multiple boxes in front of robot
  if (move === "^" || move === "v") {
    const [dr, sortDir] = move === "^" ? [-1, 1] : [1, -1];
    const touchingBoxes = findTouchingBoxes(grid, r + dr, c, dr).sort(
      (a, b) => (a[0] - b[0]) * sortDir
    );
    for (const [i, j] of touchingBoxes)
      grid[i][j] = visited.has(`${i - dr},${j}`) ? grid[i - dr][j] : ".";
    grid[r + dr][c] = "@";

    // move row of boxes to the next free position
  } else {
    const dir = move === "<" ? 1 : -1;
    for (let i = freeI; i * dir <= c * dir; i += dir)
      grid[r][i] = grid[r][i + (move === "<" ? 1 : -1)];
  }
  grid[r][c] = ".";
};

const getBoxCoord = (grid: Grid) =>
  grid
    .flatMap((row, r) => row.map((ch, c) => (ch === "O" || ch === "[" ? [r, c] : null)))
    .filter(Boolean) as number[][];

const sumCoords = (arr: number[][]) => arr.reduce((a, [r, c]) => a + 100 * r + c, 0);
