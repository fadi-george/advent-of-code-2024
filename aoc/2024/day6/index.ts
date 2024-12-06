import { get1DIndex, get2DIndex } from "../../lib/array";

enum Direction {
  Up,
  Right,
  Down,
  Left,
}

export default (input: string) => {
  const grid: string[] = [];
  input.split("\n").forEach((l) => grid.push(l));

  // find guard position
  const startI = grid.findIndex((line) => line.includes("^"));
  const startJ = grid[startI].indexOf("^");
  let dir = Direction.Up;

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

  const width = grid[0].length;
  const visited = new Set<number>();

  const countPositions = () => {
    let gR = startI;
    let gC = startJ;
    while (gR >= 0 && gR < grid.length && gC >= 0 && gC < grid[gR].length) {
      // next step
      const next = getNext(gR, gC, dir);

      const nextChar = grid[next.r]?.[next.c];
      if (nextChar === "#") {
        // turn right
        dir = (dir + 1) % 4;
      } else {
        if (nextChar !== undefined)
          visited.add(get1DIndex(next.r, next.c, width));
        gR = next.r;
        gC = next.c;
      }
    }
  };

  countPositions();

  const checkLoop = () => {
    let gR = startI;
    let gC = startJ;
    let dir = Direction.Up;
    let visited2 = new Set<string>();

    while (gR >= 0 && gR < grid.length && gC >= 0 && gC < grid[0].length) {
      const next = getNext(gR, gC, dir);
      const nextChar = grid[next.r]?.[next.c];

      if (visited2.has(get1DIndex(next.r, next.c, width) + "," + dir))
        return true;
      visited2.add(get1DIndex(next.r, next.c, width) + "," + dir);

      if (nextChar === "#" || nextChar === "O") {
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
    const [rr, cc] = get2DIndex(index, width);

    const originalRow = grid[rr].slice(0);
    if (rr === startI && cc === startJ) return;
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
