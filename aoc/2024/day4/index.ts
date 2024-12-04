export default (input: string) => {
  const grid: string[][] = [];
  input.split("\n").forEach((line) => {
    grid.push(line.split(""));
  });

  // console.log(grid);

  const part1 = () => {
    const checkRight = (i: number, j: number) => {
      let str = "X";
      for (let k = j + 1; k < j + 4; k++) {
        if (!grid[i][k]) return false;
        str += grid[i][k];
      }
      return str === "XMAS";
    };

    const checkLeft = (i: number, j: number) => {
      let str = "X";
      for (let k = j - 1; k >= j - 3; k--) {
        if (!grid[i][k]) return false;
        str += grid[i][k];
      }
      return str === "XMAS";
    };

    const checkDown = (i: number, j: number) => {
      let str = "X";
      for (let k = i + 1; k < i + 4; k++) {
        if (!grid[k]) return false;
        if (!grid[k][j]) return false;
        str += grid[k][j];
      }
      return str === "XMAS";
    };

    const checkUp = (i: number, j: number) => {
      let str = "X";
      for (let k = i - 1; k >= i - 3; k--) {
        if (!grid[k]) return false;
        if (!grid[k][j]) return false;
        str += grid[k][j];
      }
      return str === "XMAS";
    };

    const checkDownRight = (i: number, j: number) => {
      let str = "X";
      for (let k = 1; k < 4; k++) {
        if (!grid[i + k]) return false;
        if (!grid[i + k][j + k]) return false;
        str += grid[i + k][j + k];
      }
      return str === "XMAS";
    };

    const checkUpRight = (i: number, j: number) => {
      let str = "X";
      for (let k = 1; k < 4; k++) {
        if (!grid[i - k]) return false;
        if (!grid[i - k][j + k]) return false;
        str += grid[i - k][j + k];
      }
      return str === "XMAS";
    };

    const checkDownLeft = (i: number, j: number) => {
      let str = "X";
      for (let k = 1; k < 4; k++) {
        if (!grid[i + k]) return false;
        if (!grid[i + k][j - k]) return false;
        str += grid[i + k][j - k];
      }
      return str === "XMAS";
    };

    const checkUpLeft = (i: number, j: number) => {
      let str = "X";
      for (let k = 1; k < 4; k++) {
        if (!grid[i - k]) return false;
        if (!grid[i - k][j - k]) return false;
        str += grid[i - k][j - k];
      }
      return str === "XMAS";
    };

    const indicies: [number, number][] = [];

    let count = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== "X") continue;

        [
          checkRight,
          checkLeft,
          checkDown,
          checkUp,
          checkDownRight,
          checkUpRight,
          checkDownLeft,
          checkUpLeft,
        ].forEach((check) => {
          if (check(i, j)) {
            indicies.push([i, j]);
            count++;
          }
        });
      }
    }
    console.log(count);
  };

  const part2 = () => {
    let count = 0;
    const checkPattern1 = (i: number, j: number) => {
      let mCount = 0;
      let sCount = 0;

      // corners
      [
        [i - 1, j - 1],
        [i - 1, j + 1],
        [i + 1, j - 1],
        [i + 1, j + 1],
      ].forEach(([x, y]) => {
        if (!grid[x]) return;
        if (!grid[x][y]) return;
        if (grid[x][y] === "M") mCount++;
        if (grid[x][y] === "S") sCount++;
      });

      return mCount === 2 && sCount === 2;
    };

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== "A") continue;
        if (checkPattern1(i, j)) {
          count++;
        }
      }
    }
    console.log(count);
  };

  return {
    part1: part1(),
    part2: part2(),
  };
};
