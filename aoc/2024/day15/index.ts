import { printGrid } from "../../lib/general";

const chMap = {
  ".": [".", "."],
  O: ["[", "]"],
  "#": ["#", "#"],
  "@": ["@", "."],
};

export default (input: string) => {
  const [gridLines, moveLines] = input.split("\n\n");
  const moves = moveLines.replace(/\n/g, "");

  const grid = gridLines.split("\n").map((line) => line.split(""));
  const grid2 = grid.map((l) => l.flatMap((c) => chMap[c as keyof typeof chMap]));

  const [sR, sC] = findRobot(grid);
  const [sR2, sC2] = findRobot(grid2);
  let [r, c, r2, c2] = [sR, sC, sR2, sC2];

  printGrid(grid);
  printGrid(grid2);

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    [r, c] = moveRobot(grid, r, c, move);
    // [r2, c2] = moveRobot(grid2, r2, c2, move);
  }

  printGrid(grid);

  const p1 = sumBoxCoord(getBoxCoord(grid));
  // const p2 = sumBoxCoord(getBoxCoord(grid2));

  return {
    part1: p1,
    part2: "TODO",
  };
};

const findRobot = (grid: string[][]) => {
  const r = grid.findIndex((line) => line.includes("@"));
  const c = grid[r].indexOf("@");
  return [r, c];
};

const moveRobot = (grid: string[][], r: number, c: number, move: string) => {
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

  // O or [ or ]
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
  // }
  // if (ch === "[" || ch === "]") {
  //   const rowInds = [];
  //   let freeI = -1;
  //   switch (move) {
  //     case "^":
  //       for (let i = r; i >= 0; i--) {
  //         if (grid[i][c] === "#") break;
  //         if (grid[i][c] === ".") {
  //           freeI = i;
  //           break;
  //         }
  //       }
  //       if (freeI === -1) return [r, c];

  //       for (let i = r + 1; i >= freeI; i--) {
  //         if (isColumnUpBlocked(grid, i, c)) return [r, c];
  //       }

  //       grid[r][c] = ".";
  //       grid[freeI][c] = "[";
  //       return [freeI, c];
  //     case "v":
  //       break;
  //     case "<":
  //       break;
  //     case ">":
  //       break;
  //   }
  // }

  return [r, c];
};

const isColumnUpBlocked = (grid: string[][], r: number, c: number) => {
  for (let i = r; i > 0; i--) {
    if (grid[i][c] === "#") return true;
    if (grid[i][c] === "]") {
      // check left side of box
      if (isColumnUpBlocked(grid, i, c - 1)) return true;
    }
    if (grid[i][c] === "[") {
      // check right side of box
      if (isColumnUpBlocked(grid, i, c + 1)) return true;
    }
  }
  return false;
};
const moveBigBoxUp = (grid: string[][], r: number, c: number, i: number) => {
  for (let j = i; j <= r; j++) {
    if (grid[j][c] === "]") {
      moveBigBoxUp(grid, j, c - 1, i);
    }
    if (grid[j][c] === "[") {
      moveBigBoxUp(grid, j, c + 1, i);
    }
    grid[j][c] = grid[j + 1][c];
  }
};

const getBoxCoord = (grid: string[][]) => {
  const [w, h] = [grid[0].length, grid.length];
  const boxCoord = [];
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (grid[r][c] === "O") {
        boxCoord.push([r, c]);
      }
    }
  }
  return boxCoord;
};

const sumBoxCoord = (coords: number[][]) =>
  coords.reduce((acc, [r, c]) => acc + 100 * r + c, 0);
// const moveRobot = (sR: number, sC: number, moves: string) => {
//   printGrid(grid);
//   // const [x, y] = robot.split(",").map(Number);
//   // const move = moves[0];
//   // const newX = x + move.x;
//   // const newY = y + move.y;
//   // return [newX, newY];
// };
