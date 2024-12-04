export default (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  const part1 = () => {
    let count = 0;
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    const checkDirection = (i: number, j: number, dx: number, dy: number) => {
      let str = "";
      for (let k = 1; k < 4; k++) {
        const row = i + k * dy;
        const col = j + k * dx;
        if (!grid[row]?.[col]) return false;
        str += grid[row][col];
      }
      return str === "MAS";
    };

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== "X") continue;

        for (const [dx, dy] of directions) {
          if (checkDirection(i, j, dx, dy)) count++;
        }
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
