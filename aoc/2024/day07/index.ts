const checkTarget = (arr: number[], target: number, allowConcat = false) => {
  const dfs = (v: number, i: number): boolean => {
    if (i === 0) return v === arr[0];

    let d = 1;
    let n = arr[i];
    while (d <= n) d *= 10;

    let res = false;
    // if numbers are concatenated, then shift to the right by how many digits the
    if (allowConcat && v % d === n) res ||= dfs(Math.floor(v / d), i - 1);
    // check if the number is a valid divisor
    res ||= v % n === 0 && dfs(v / n, i - 1);
    res ||= dfs(v - n, i - 1);
    return res;
  };

  return dfs(target, arr.length - 1);
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
