const numberConcat = (a: number, b: number) =>
  a * 10 ** (Math.floor(Math.log10(b)) + 1) + b;

const checkTarget = (arr: number[], target: number, allowConcat = false) => {
  const dfs = (value: number, length: number): boolean =>
    length === arr.length
      ? value === target
      : dfs(value + arr[length], length + 1) ||
        dfs(value * arr[length], length + 1) ||
        (allowConcat && dfs(numberConcat(value, arr[length]), length + 1));

  return (
    dfs(arr[0] + arr[1], 2) ||
    dfs(arr[0] * arr[1], 2) ||
    (allowConcat && dfs(numberConcat(arr[0], arr[1]), 2))
  );
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
