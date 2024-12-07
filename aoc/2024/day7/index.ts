const checkTarget = (arr: number[], target: number, allowConcat = false) => {
  const dfs = (value: number, length: number): boolean => {
    let i = 1;
    while (i < arr[length]) i *= 10;
    return length === arr.length
      ? value === target
      : dfs(value + arr[length], length + 1) ||
          dfs(value * arr[length], length + 1) ||
          (allowConcat && dfs(value * i + arr[length], length + 1));
  };

  return dfs(arr[0], 1);
};

export default (input: string) => {
  const vals = input.split("\n").map((line) => line.match(/\d+/g)!.map(Number));
  let [p1, p2] = [0, 0];
  vals.forEach(([product, ...rest]) => {
    p1 += checkTarget(rest, product) ? product : 0;
    p2 += checkTarget(rest, product, true) ? product : 0;
  });
  return { part1: p1, part2: p2 };
};
