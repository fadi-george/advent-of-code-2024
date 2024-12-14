import { printGrid } from "../../lib/general";
const [EMPTY, FILLED] = [".", "#"];

export default (input: string, w: number = 101, h: number = 103) => {
  const lines = input.split("\n").map((l, i) => [...l.match(/-?\d+/g)!.map(Number), i]);

  // prettier-ignore
  const grid = Array(h).fill(null).map(() => Array(w).fill(EMPTY));

  const robotsInfo: Record<number, [number, number, number, number]> = {};
  lines.forEach(([x, y, vx, vy, i]) => {
    robotsInfo[i] = [x, y, vx, vy];
    grid[y][x] = FILLED;
  });

  let p1 = 0;
  for (let i = 0; i < 8000; i++) {
    if (i === 100) {
      const counts = countRobotsInQuadrants(robotsInfo, w, h);
      p1 = counts.product();
    }
    updatePositions(robotsInfo, grid);
    // console.log(`${i}\n\n`);
    // printGrid(grid); // uncomment to see the grid, my result was 7572
  }

  return {
    part1: p1,
    part2: 7572,
  };
};

const updatePositions = (
  robotsInfo: Record<string, [number, number, number, number]>,
  grid: string[][]
) => {
  const w = grid[0].length;
  const h = grid.length;
  for (const [i, [x, y, vx, vy]] of Object.entries(robotsInfo)) {
    grid[y][x] = EMPTY;
    const newX = (((x + vx) % w) + w) % w; // wrap around the grid horizontally
    const newY = (((y + vy) % h) + h) % h; // wrap around the grid vertically
    robotsInfo[i] = [newX, newY, vx, vy];
    grid[newY][newX] = "#";
  }
};

const countRobotsInQuadrants = (
  robotsInfo: Record<string, [number, number, number, number]>,
  w: number,
  h: number
) => {
  const [midW, midH] = [Math.floor(w / 2), Math.floor(h / 2)];
  const counts = [0, 0, 0, 0];

  for (const [_, [x, y]] of Object.entries(robotsInfo)) {
    if (x === midW || y === midH) continue; // avoid midpoints
    const quadrant = (x >= midW ? 1 : 0) + (y >= midH ? 2 : 0);
    counts[quadrant]++;
  }

  return counts;
};
