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

  const sGI = gI;
  const sGJ = gJ;

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

  // // find loops
  let rr;
  let cc;

  const checkLoop = () => {
    let gR = sGI;
    let gC = sGJ;
    let dir = Direction.Up;
    let visited2 = new Set<string>();

    while (gR >= 0 && gR < grid.length && gC >= 0 && gC < grid[0].length) {
      // console.log({ rr, cc, gR, gC });
      // console.log({ rr, cc, gR, gC });
      const next = getNext(gR, gC, dir);
      const nextChar = grid[next.r]?.[next.c];

      // if (nextChar === "O") {
      //   if (visited2.has(rowCol2Index(next.r, next.c) + "," + dir)) return true;
      //   else visited2.add(rowCol2Index(next.r, next.c) + "," + dir);
      // }
      if (visited2.has(rowCol2Index(next.r, next.c) + "," + dir)) return true;
      // if (nextChar !== undefined)
      visited2.add(rowCol2Index(next.r, next.c) + "," + dir);

      if (nextChar === "#" || nextChar === "O") {
        // turn right
        dir = (dir + 1) % 4;
      } else {
        gR = next.r;
        gC = next.c;
      }
    }
    return false;
  };

  let p2Count = 0;

  [...visited].forEach((index) => {
    [rr, cc] = index.split(",").map(Number);

    const originalRow = grid[rr].slice(0);
    if (rr === sGI && cc === sGJ) return;
    grid[rr] = grid[rr].slice(0, cc) + "O" + grid[rr].slice(cc + 1);
    if (checkLoop()) {
      p2Count++;
    }

    grid[rr] = originalRow;
  });

  return {
    part1: visited.size,
    part2: p2Count,
  };
};
