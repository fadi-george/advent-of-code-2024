import { printGrid } from "../../lib/general";

export default (input: string) => {
  const [gridLines, moves] = input.split("\n\n");
  const grid = gridLines.split("\n").map((line) => line.split(""));
  const sR = grid.findIndex((line) => line.includes("@"));
  const sC = grid[sR].indexOf("@");
  // const moves = moveLines;

  // console.log({
  //   grid,
  //   moves,
  // });
  printGrid(grid);
  const [w, h] = [grid[0].length, grid.length];

  let r = sR;
  let c = sC;
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    let dr = 0;
    let dc = 0;

    switch (move) {
      case "^":
        dr = -1;
        break;
      case "v":
        dr = 1;
        break;
      case "<":
        dc = -1;
        break;
      case ">":
        dc = 1;
        break;
    }

    const ch = grid[r + dr]?.[c + dc];
    // console.log(`Move ${i + 1}: ${move}`);
    if (ch === "#") {
    } else if (ch === ".") {
      // free space
      grid[r][c] = ".";
      r += dr;
      c += dc;
      grid[r][c] = "@";
    } else if (ch === "O") {
      let freeI = -1;

      switch (move) {
        case "^":
          for (let i = r; i > 0; i--) {
            if (grid[i][c] === ".") {
              freeI = i;
              break;
            } else if (grid[i][c] === "#") {
              break;
            }
          }
          if (freeI === -1) continue;

          // shift everything up
          for (let i = freeI; i <= r; i++) {
            grid[i][c] = grid[i + 1][c];
          }
          grid[r][c] = ".";
          r--;
          break;
        case "v":
          for (let i = r; i < h; i++) {
            if (grid[i][c] === ".") {
              freeI = i;
              break;
            } else if (grid[i][c] === "#") {
              break;
            }
          }
          if (freeI === -1) continue;

          for (let i = freeI; i >= r; i--) {
            grid[i][c] = grid[i - 1][c];
          }
          grid[r][c] = ".";
          r++;
          break;
        case "<":
          for (let i = c; i >= 0; i--) {
            if (grid[r][i] === ".") {
              freeI = i;
              break;
            } else if (grid[r][i] === "#") {
              break;
            }
          }
          if (freeI === -1) continue;

          for (let i = freeI; i <= c; i++) {
            grid[r][i] = grid[r][i + 1];
          }
          grid[r][c] = ".";
          c--;
          break;
        case ">":
          for (let i = c; i < w; i++) {
            if (grid[r][i] === ".") {
              freeI = i;
              break;
            } else if (grid[r][i] === "#") {
              break;
            }
          }
          if (freeI === -1) continue;

          for (let i = freeI; i >= c; i--) {
            grid[r][i] = grid[r][i - 1];
          }
          grid[r][c] = ".";
          c++;
          break;
      }
    }

    // printGrid(grid);
  }

  const coords = getBoxCoord(grid);
  const p1 = coords.reduce((acc, [r, c]) => acc + 100 * r + c, 0);
  // console.log({ coords });

  return {
    part1: p1,
    part2: "TODO",
  };
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
// const moveRobot = (sR: number, sC: number, moves: string) => {
//   printGrid(grid);
//   // const [x, y] = robot.split(",").map(Number);
//   // const move = moves[0];
//   // const newX = x + move.x;
//   // const newY = y + move.y;
//   // return [newX, newY];
// };
