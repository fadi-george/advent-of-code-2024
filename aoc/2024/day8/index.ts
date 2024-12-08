import { get1DIndex } from "../../lib/array";

export default (input: string) => {
  const grid = input.split("\n"),
    w = grid[0].length,
    h = grid.length;
  const antennas: Record<string, [number, number][]> = {};

  for (let i = 0; i < h; i++)
    for (let j = 0; j < w; j++)
      if (grid[i][j] !== "." && grid[i][j] !== "#")
        (antennas[grid[i][j]] ??= []).push([i, j]);

  const getImpact = (isCapped: boolean) => {
    const visited = new Set<number>();

    const visitPoints = (p: number[], dir: number[]) => {
      while (grid[p[0]]?.[p[1]]) {
        visited.add(get1DIndex(p[0], p[1], w));
        p = [p[0] + dir[0], p[1] + dir[1]];
        if (isCapped) break;
      }
    };

    Object.values(antennas).forEach((ps) => {
      for (let i = 0; i < ps.length; i++)
        for (let j = i + 1; j < ps.length; j++) {
          const [x1, y1] = ps[i],
            [x2, y2] = ps[j],
            dx = x2 - x1,
            dy = y2 - y1;
          let p1 = [x1 - dx, y1 - dy],
            p2 = [x2 + dx, y2 + dy];

          if (!isCapped)
            [get1DIndex(x1, y1, w), get1DIndex(x2, y2, w)].forEach((i) =>
              visited.add(i)
            );

          visitPoints(p1, [-dx, -dy]);
          visitPoints(p2, [dx, dy]);
        }
    });
    return visited.size;
  };

  return { part1: getImpact(true), part2: getImpact(false) };
};
