export default (input: string) => {
  const p1Vals: [number, number][] = [];
  const p2Vals: [number, number][] = [];

  let ignored = false;

  input.split("\n").forEach((line) => {
    const matches = line.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g) || [];

    for (const match of matches) {
      const [command, x, y] = match.values();

      if (command === "do()") ignored = false;
      else if (command === "don't()") ignored = true;
      else {
        p1Vals.push([+x, +y]);
        if (!ignored) p2Vals.push([+x, +y]);
      }
    }
  });

  const part1 = () => p1Vals.reduce((acc, [x, y]) => acc + x * y, 0);

  const part2 = () => p2Vals.reduce((acc, [x, y]) => acc + x * y, 0);

  return {
    part1: part1(),
    part2: part2(),
  };
};
