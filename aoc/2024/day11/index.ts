export default (input: string, p1Blinks: number = 25, p2Blinks: number = 75) => {
  const stones = input.split(" ").map(Number);
  const stoneCache = new Map<string, number>();

  const blink = (stone: number, i: number): number => {
    const cacheKey = `${stone}-${i}`;
    if (stoneCache.has(cacheKey)) return stoneCache.get(cacheKey)!;

    let result: number;

    if (i === 0) return 1;
    else if (stone === 0) result = blink(1, i - 1);
    else {
      const stoneStr = stone.toString();
      if (stoneStr.length % 2 === 0) {
        const mid = stoneStr.length >> 1;
        const left = +stoneStr.substring(0, mid);
        const right = +stoneStr.substring(mid);
        result = blink(left, i - 1) + blink(right, i - 1);
      } else result = blink(stone * 2024, i - 1);
    }

    stoneCache.set(cacheKey, result);
    return result;
  };

  const calculateSum = (amount: number) =>
    stones.reduce((sum, stone) => sum + blink(stone, amount), 0);

  return {
    part1: calculateSum(p1Blinks),
    part2: calculateSum(p2Blinks),
  };
};
