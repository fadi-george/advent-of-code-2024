export default (input: string) => {
  let stones = input.split("\n").map((r) => r.split(" ").map(Number))[0];

  const stoneCache = new Map<string, number>();

  const search = (stone: number, i: number): number => {
    if (stoneCache.has(`${stone}-${i}`)) return stoneCache.get(`${stone}-${i}`)!;
    if (i === 0) {
      stoneCache.set(`${stone}-${i}`, 1);
      return 1;
    }
    if (stone === 0) {
      const result = search(1, i - 1);
      stoneCache.set(`${stone}-${i}`, result);
      return result;
    }

    const stoneStr = `${stone}`;
    if (stoneStr.length % 2 === 0) {
      const len = stoneStr.length;
      const left = +stoneStr.slice(0, len / 2);
      const right = +stoneStr.slice(len / 2);

      const leftResult = search(left, i - 1);
      const rightResult = search(right, i - 1);
      const result = leftResult + rightResult;
      stoneCache.set(`${stone}-${i}`, result);
      return result;
    }

    const result = search(stone * 2024, i - 1);
    stoneCache.set(`${stone}-${i}`, result);
    return result;
  };

  let [p1, p2] = [0, 0];

  for (let j = 0; j < stones.length; j++) {
    p1 += search(stones[j], 25);
  }
  for (let j = 0; j < stones.length; j++) {
    p2 += search(stones[j], 75);
  }

  return {
    part1: p1,
    part2: p2,
  };
};
