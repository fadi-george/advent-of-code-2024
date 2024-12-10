import { Direction } from "../../constants";
import { get1DIndex, get2DIndex } from "../../lib/array";

export default (input: string) => {
  const grid = input.split("\n");
  const startI = grid.findIndex((line) => line.includes("^"));
  const startJ = grid[startI].indexOf("^");
  const width = grid[0].length;
  const visited = new Set<number>();

  const getNext = (r: number, c: number, d: Direction) => ({
    r: r + [-1, 0, 1, 0][d],
    c: c + [0, 1, 0, -1][d],
  });

  const traverse = (checkForLoop = false) => {
    let [r, c, dir] = [startI, startJ, Direction.Up];
    const visitedMap = new Set<number>();

    while (true) {
      const next = getNext(r, c, dir);
      const nextChar = grid[next.r]?.[next.c];

      if (checkForLoop) {
        const key = (get1DIndex(next.r, next.c, width) << 2) | dir;
        if (visitedMap.has(key)) return true;
        visitedMap.add(key);
      }

      if (nextChar === undefined) break;
      if (nextChar === "#") {
        dir = (dir + 1) & 3;
        continue;
      }
      if (!checkForLoop) visited.add(get1DIndex(next.r, next.c, width));
      [r, c] = [next.r, next.c];
    }
    return false;
  };

  traverse();

  let p2Count = 0;
  [...visited].forEach((index) => {
    const [r, c] = get2DIndex(index, width);
    if (r === startI && c === startJ) return;

    const originalR = grid[r];
    grid[r] = grid[r].substring(0, c) + "#" + grid[r].substring(c + 1);
    if (traverse(true)) p2Count++;
    grid[r] = originalR;
  });

  return { part1: visited.size, part2: p2Count };
};
