const numberConcat = (a: number, b: number) =>
  a * 10 ** (Math.floor(Math.log10(b)) + 1) + b;

const checkTarget = (arr: number[], target: number, allowConcat = false) => {
  if (arr.length === 1) return arr[0] === target;

  const q = [
    { v: arr[0] + arr[1], l: 2 },
    { v: arr[0] * arr[1], l: 2 },
    ...(allowConcat ? [{ v: numberConcat(arr[0], arr[1]), l: 2 }] : []),
  ];

  for (const curr of q) {
    if (curr.v === target && curr.l === arr.length) return true;
    if (curr.l === arr.length) continue;

    q.push(
      { v: curr.v + arr[curr.l], l: curr.l + 1 },
      { v: curr.v * arr[curr.l], l: curr.l + 1 },
      ...(allowConcat
        ? [{ v: numberConcat(curr.v, arr[curr.l]), l: curr.l + 1 }]
        : [])
    );
  }

  return false;
};

export default (input: string) => {
  const vals: number[][] = [];
  input.split("\n").forEach((line) => {
    const nums = line.match(/\d+/g)!.map(Number);
    vals.push(nums);
  });

  let p1 = 0;
  let p2 = 0;
  vals.forEach((val) => {
    const [product, ...rest] = val;
    p1 += checkTarget(rest, product) ? product : 0;
    p2 += checkTarget(rest, product, true) ? product : 0;
  });

  return { part1: p1, part2: p2 };
};
