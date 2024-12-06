import { get1DIndex, get2DIndex } from "../../lib/array";

enum Direction {
  Up,
  Right,
  Down,
  Left,
}

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
    const visited2 = new Set<string>();

    while (r >= 0 && r < grid.length && c >= 0 && c < width) {
      const next = getNext(r, c, dir);
      const nextChar = grid[next.r]?.[next.c];

      if (checkForLoop) {
        const key = `${get1DIndex(next.r, next.c, width)},${dir}`;
        if (visited2.has(key)) return true;
        visited2.add(key);
      }

      if (nextChar === undefined) break;
      if (nextChar === "#" || nextChar === "O") {
        dir = (dir + 1) % 4;
      } else {
        if (!checkForLoop) visited.add(get1DIndex(next.r, next.c, width));
        [r, c] = [next.r, next.c];
      }
    }
    return false;
  };

  traverse();

  let p2Count = 0;
  [...visited].forEach((index) => {
    const [rr, cc] = get2DIndex(index, width);
    if (rr === startI && cc === startJ) return;

    const originalChar = grid[rr][cc];
    grid[rr] = grid[rr].slice(0, cc) + "O" + grid[rr].slice(cc + 1);
    if (traverse(true)) p2Count++;
    grid[rr] = grid[rr].slice(0, cc) + originalChar + grid[rr].slice(cc + 1);
  });

  return { part1: visited.size, part2: p2Count };
};
