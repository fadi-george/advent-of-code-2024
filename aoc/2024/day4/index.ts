export default (input: string) => {
  const grid: string[][] = [];
  input.split("\n").forEach((line) => {
    grid.push(line.split(""));
  });

  const part1 = () => {
    let count = 0;

    const checkDirection = (i: number, j: number, dx: number, dy: number) => {
      let str = "X";
      for (let k = 1; k < 4; k++) {
        const row = i + k * dy;
        const col = j + k * dx;
        if (!grid[row]?.[col]) return false;
        str += grid[row][col];
      }
      return str === "XMAS";
    };

    const checkRight = (i: number, j: number) => checkDirection(i, j, 1, 0);
    const checkLeft = (i: number, j: number) => checkDirection(i, j, -1, 0);
    const checkDown = (i: number, j: number) => checkDirection(i, j, 0, 1);
    const checkUp = (i: number, j: number) => checkDirection(i, j, 0, -1);
    const checkDownRight = (i: number, j: number) => checkDirection(i, j, 1, 1);
    const checkUpRight = (i: number, j: number) => checkDirection(i, j, 1, -1);
    const checkDownLeft = (i: number, j: number) => checkDirection(i, j, -1, 1);
    const checkUpLeft = (i: number, j: number) => checkDirection(i, j, -1, -1);

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
          if (check(i, j)) count++;
        });
      }
    }
    return count;
  };

  const part2 = () => {
    let count = 0;

    const checkPattern = (i: number, j: number) => {
      const tl = grid[i - 1]?.[j - 1];
      const tr = grid[i - 1]?.[j + 1];
      const bl = grid[i + 1]?.[j - 1];
      const br = grid[i + 1]?.[j + 1];

      return (
        ((tl === "M" && br === "S") || (tl === "S" && br === "M")) &&
        ((bl === "M" && tr === "S") || (bl === "S" && tr === "M"))
      );
    };

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== "A") continue;
        if (checkPattern(i, j)) count++;
      }
    }
    return count;
  };

  return {
    part1: part1(),
    part2: part2(),
  };
};
