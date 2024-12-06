enum Direction {
  Up,
  Right,
  Down,
  Left,
}

export default (input: string) => {
  const grid: string[] = [];
  input.split("\n").forEach((line) => {
    grid.push(line);
  });

  // find the start position
  let gI = grid.findIndex((line) => line.includes("^"));
  let gJ = grid[gI].indexOf("^");
  let dir = Direction.Up;
  let visited = new Set<string>();

  const rowCol2Index = (r: number, c: number) => `${r},${c}`;

  const getNext = (r: number, c: number, d: Direction) => {
    switch (d) {
      case Direction.Up:
        return { r: r - 1, c };
      case Direction.Right:
        return { r, c: c + 1 };
      case Direction.Down:
        return { r: r + 1, c };
      case Direction.Left:
        return { r, c: c - 1 };
    }
  };

  while (gI >= 0 && gI < grid.length && gJ >= 0 && gJ < grid[gI].length) {
    const current = grid[gI][gJ];
    // next step
    const next = getNext(gI, gJ, dir);

    const nextChar = grid[next.r]?.[next.c];
    if (nextChar === "#") {
      // turn right
      dir = (dir + 1) % 4;
    } else {
      if (nextChar !== undefined) visited.add(rowCol2Index(next.r, next.c));
      gI = next.r;
      gJ = next.c;
    }
  }

  const p1 = "";
  const p2 = "";

  return {
    part1: visited.size,
    part2: p2,
  };
};
