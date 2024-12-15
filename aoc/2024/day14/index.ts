import { product, wrap } from "../../lib/array";
import { printGrid } from "../../lib/general";
const [EMPTY, FILLED, W, H] = [" ", "#", 101, 103];

export default (input: string) => {
  const robots = input.split("\n").map((line) => line.match(/-?\d+/g)!.map(Number));

  // prettier-ignore
  const grid = Array(H).fill(null).map(() => Array(W).fill(EMPTY));
  for (const [x, y] of robots) grid[y][x] = FILLED;

  let [p1, p2] = [0, 0];
  for (let i = 0; i < W * H; i++) {
    if (grid.some((r) => r.join("").includes("################"))) {
      printGrid(grid);
      p2 = i;
      break;
    }
    if (i === 100) {
      const counts = countRobotsInQuadrants(robots, W, H);
      p1 = product(counts);
    }
    updatePositions(robots, grid);
  }

  return {
    part1: p1,
    part2: p2,
  };
};

const updatePositions = (robots: number[][], grid: string[][]) => {
  for (const [x, y] of robots) grid[y][x] = EMPTY;

  for (const [i, [x, y, vx, vy]] of robots.entries()) {
    const newX = wrap(x + vx, 0, W);
    const newY = wrap(y + vy, 0, H);
    robots[i] = [newX, newY, vx, vy];
    grid[newY][newX] = FILLED;
  }
};

const countRobotsInQuadrants = (robots: number[][], w: number, h: number) => {
  const [midW, midH] = [Math.floor(w / 2), Math.floor(h / 2)];
  const counts = [0, 0, 0, 0];

  for (const [_, [x, y]] of robots.entries()) {
    if (x === midW || y === midH) continue; // avoid midpoints
    const quadrant = (x >= midW ? 1 : 0) + (y >= midH ? 2 : 0);
    counts[quadrant]++;
  }

  return counts;
};
