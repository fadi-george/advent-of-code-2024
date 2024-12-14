export default (input: string, w: number = 101, h: number = 103) => {
  const lines: number[][] = input
    .split("\n")
    .map((line, i) => [...line.match(/-?\d+/g)!.map(Number), i]);

  const robotsInfo: Record<number, [number, number, number, number]> = {};
  lines.forEach(([x, y, vx, vy, i]) => {
    robotsInfo[i] = [x, y, vx, vy];
  });

  const W = w;
  const H = h;

  for (let i = 0; i < 100; i++) {
    updatePositions(robotsInfo, W, H);
  }
  const counts = countRobotsInQuadrants(robotsInfo, W, H);

  const p1 = counts.product();

  return {
    part1: p1,
    part2: "TODO",
  };
};

const updatePositions = (
  robotsInfo: Record<string, [number, number, number, number]>,
  w: number,
  h: number
) => {
  for (const [i, [x, y, vx, vy]] of Object.entries(robotsInfo)) {
    // robotsInfo[i] = [x + vx, y + vy, vx, vy];
    let newX = x + vx;
    let newY = y + vy;
    if (newX < 0) newX += w;
    if (newY < 0) newY += h;
    if (newX >= w) newX = newX - w;
    if (newY >= h) newY = newY - h;
    robotsInfo[i] = [newX, newY, vx, vy];
  }
};

const countRobotsInQuadrants = (
  robotsInfo: Record<string, [number, number, number, number]>,
  w,
  h
) => {
  const quadrantRanges = [
    [0, Math.floor(w / 2), 0, Math.floor(h / 2)], // end exclusive
    [Math.ceil(w / 2), w, 0, Math.floor(h / 2)], // end exclusive
    [0, Math.floor(w / 2), Math.ceil(h / 2), h], // end exclusive
    [Math.ceil(w / 2), w, Math.ceil(h / 2), h], // end exclusive
  ];

  const counts = Array.from({ length: 4 }, () => 0);

  for (const [i, [x, y, vx, vy]] of Object.entries(robotsInfo)) {
    for (const [j, q] of quadrantRanges.entries()) {
      if (x >= q[0] && x < q[1] && y >= q[2] && y < q[3]) {
        counts[j]++;
      }
    }
  }

  return counts;
};
