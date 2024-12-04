export default (input: string) => {
  const grid = input.split("\n").map((line) => line);

  let p1Count = 0;
  let p2Count = 0;

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

  const checkDirection = (i: number, j: number, dx: number, dy: number) =>
    grid[i + dy]?.[j + dx] === "M" &&
    grid[i + 2 * dy]?.[j + 2 * dx] === "A" &&
    grid[i + 3 * dy]?.[j + 3 * dx] === "S";

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
      if (grid[i][j] === "X") {
        for (const [dx, dy] of directions) {
          if (checkDirection(i, j, dx, dy)) p1Count++;
        }
      } else if (grid[i][j] === "A") {
        if (checkPattern(i, j)) p2Count++;
      }
    }
  }

  return {
    part1: p1Count,
    part2: p2Count,
  };
};
