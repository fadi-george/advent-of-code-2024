export default (input: string) => {
  const boxes = input.split("\n").map((line) => line.split("x").map(Number));

  const getSurfaceArea = (l: number, w: number, h: number) =>
    2 * l * w + 2 * w * h + 2 * h * l;
  const getSmallestArea = (l: number, w: number, h: number) =>
    Math.min(l * w, w * h, h * l);
  const getRibbonLength = (l: number, w: number, h: number) => {
    const sorted = [l, w, h].sort((a, b) => a - b);
    return 2 * sorted[0] + 2 * sorted[1] + l * w * h;
  };

  const p1 = boxes.reduce(
    (acc, [l, w, h]) =>
      acc + getSurfaceArea(l, w, h) + getSmallestArea(l, w, h),
    0
  );
  const p2 = boxes.reduce(
    (acc, [l, w, h]) => acc + getRibbonLength(l, w, h),
    0
  );

  return {
    part1: p1,
    part2: p2,
  };
};
